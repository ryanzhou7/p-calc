import * as ImageAnalysis from "./ImageAnalysis";
import CanvasDataHelper from "../../models/canvasData";
import jsfeat from "jsfeat";

// Consider that some non chart area will be capture, thus start the calculations from a padding, not from the very top
const START_HEIGHT = 12;

// If the y coor is greater than this is number it is lower, thus within, the 5% rule
const WITHIN_HEIGHT = 182;

async function fullAnalysis(image, combinedCanvasInfo, canvasRef, threshold) {
  const { width, height } = image;
  const dimensions = {
    detectionWidth: width,
    detectionHeight: height,
  };

  // Edge canvas stuff
  const { current: canvas } = canvasRef;
  const edgeContext = canvas.getContext("2d");
  const edgeCanvas = await getEdgeCanvasHelper(image, edgeContext);

  /*
   * Setup
   */

  const { context } = combinedCanvasInfo;
  context.drawImage(image, 0, 0, width, height);
  let imageData = context.getImageData(0, 0, width, height);

  const canvasData = new CanvasDataHelper({
    canvasWidth: dimensions.detectionWidth,
    imageArray: imageData.data,
  });

  /*
   * White balance
   */

  ImageAnalysis.retinexWhiteBalance(canvasData, { width, height });

  /*
   * Extremas
   */

  // Global extrema we look for the most "X" of a pixel, for ex. red
  const maxCoor = await findMax(canvasData, dimensions);
  const maxDetectedPixels = await ImageAnalysis.getDetectedPixels(
    canvasData,
    maxCoor,
    edgeCanvas,
    { width, height },
    threshold
  );

  // Now we look for the next "X" of a pixel that is some distance away from the one before
  const nextMaxCoor = await findNextMax(maxCoor, canvasData, width, height);

  const nextMaxdetectedPixels = await ImageAnalysis.getDetectedPixels(
    canvasData,
    nextMaxCoor,
    edgeCanvas,
    { width, height },
    threshold
  );

  /*
   * Assign top / bottom
   */

  // assume that max coor is above next max
  let topDetectedPixels = maxDetectedPixels;
  let bottomDetectedPixels = nextMaxdetectedPixels;

  // Means that max coor is not above next max
  if (maxCoor.y > nextMaxCoor.y) {
    // Switch them
    [topDetectedPixels, bottomDetectedPixels] = [
      bottomDetectedPixels,
      topDetectedPixels,
    ];
  }

  /*
   * Recolor
   */

  //  Cutoff finding
  const cuttOff = await findCutOff(topDetectedPixels, bottomDetectedPixels);

  // Recoloring
  const recolor = { r: 0, g: 255, b: 0 };
  const topPixelsCount = await ImageAnalysis.updateImageData(
    canvasData,
    { leftX: cuttOff.top.left.x, rightX: cuttOff.top.right.x, height },
    recolor,
    topDetectedPixels
  );

  const bottomPixelsCount = await ImageAnalysis.updateImageData(
    canvasData,
    { leftX: cuttOff.bottom.left.x, rightX: cuttOff.bottom.right.x, height },
    { r: 0, g: 0, b: 255 },
    bottomDetectedPixels
  );

  context.putImageData(
    imageData,
    0,
    0,
    0,
    0,
    dimensions.detectionWidth,
    dimensions.detectionHeight
  );

  return Promise.resolve({ topPixelsCount, bottomPixelsCount });
}

async function findNextMax(maxCoor, canvasData, width, height) {
  // Setup
  const photoOriginY = height / 2;
  const middleX = width / 2;

  const distanceFromOrigin = Math.abs(maxCoor.y - photoOriginY);
  const distanceFromTop = maxCoor.y;

  // If the already found coor's distance from the bottom (origin) is less than the tops then
  // it's closer to the bottom and we are searching from top to bottom
  const isTopToBottomSearch = distanceFromOrigin < distanceFromTop;
  let boundary = distanceFromTop;

  // Ensure that boundary is least some distance between the top and bottom so it won't be mistaken
  boundary += isTopToBottomSearch ? -5 : 5;

  let coor = { x: middleX };
  let intensity = Number.MIN_SAFE_INTEGER;

  let y = isTopToBottomSearch ? START_HEIGHT : photoOriginY;

  while (y !== boundary) {
    const coordinate = { x: middleX, y };
    const rgbPixel = canvasData.rgbPixel(coordinate);

    const value = rgbPixel.r * 2 - rgbPixel.b - rgbPixel.g;

    if (value > intensity) {
      coor = { y: y, x: middleX };
      intensity = value;
    }
    isTopToBottomSearch ? y++ : y--;
  }
  return coor;
}

async function findMax(canvasData, { detectionWidth, detectionHeight }) {
  const middleX = detectionWidth / 2;
  let coor = { x: middleX };
  let intensity = 0;

  // We use detection height / 2 so we only detect for the upper half of the image
  for (let y = START_HEIGHT; y < detectionHeight / 2; y++) {
    const coordinate = { x: middleX, y };
    const rgbPixel = canvasData.rgbPixel(coordinate);

    const value = rgbPixel.r * 2 - rgbPixel.b - rgbPixel.g;
    if (value > intensity) {
      coor.y = y;
      intensity = value;
    }
  }

  return coor;
}

function calculatedLossPercent(outerPixels, innerPixels) {
  let percentage = (100 * (outerPixels - innerPixels)) / outerPixels;
  return percentage.toFixed(2);
}

/**
 * We consider something "within" if the end
 *
 *
 * Divide the chart up into 4 quadrants. Let quadrant I be the top right and quadrant II be the top left.
 * The logic for I and II are the same but just applied to one side
 *
 * There are 6 possible scenarios
 * 1. Both top and bottom ends are "Within"
 * 2. Top is not within and bottom is, top horizontally extends beyond the bottom end (Top longer)
 *
 *   Top longer | Top within | Bottom within
 * 3. yes         yes           no
 * 4. no          no            yes
 * 5. yes         no            no
 * 6. no          no            no
 * Case 3-6 we just "double bound" the cutoff see function
 *
 * @param {*} topPixels
 * @param {*} bottomPixels
 */
async function findCutOff(topPixels, bottomPixels) {
  const bounds = findBounds(topPixels, bottomPixels);

  /*
   * Leftside
   */

  // both are NOT within
  if (
    !(
      bounds.top.left.y > WITHIN_HEIGHT && bounds.bottom.left.y > WITHIN_HEIGHT
    ) &&
    // bottom is within and the top is more left
    !(
      bounds.bottom.left.y > WITHIN_HEIGHT &&
      bounds.top.left.x < bounds.bottom.left.x
    )
  ) {
    // Cap the cutoff to the more limiting of the x on the left side
    const left = Math.max(bounds.top.left.x, bounds.bottom.left.x);
    bounds.top.left.x = left;
    bounds.bottom.left.x = left;
  }

  /*
   * Rightside
   */

  // both are NOT within
  if (
    !(
      bounds.top.right.y > WITHIN_HEIGHT &&
      bounds.bottom.right.y > WITHIN_HEIGHT
    ) &&
    // bottom is within and the top is more left
    !(
      bounds.bottom.right.y > WITHIN_HEIGHT &&
      bounds.top.right.x > bounds.bottom.right.x
    )
  ) {
    const right = Math.min(bounds.top.right.x, bounds.bottom.right.x);
    bounds.top.right.x = right;
    bounds.bottom.right.x = right;
  }
  return bounds;
}

/**
 * Find the left and right most
 * @param {*} topPixels
 * @param {*} bottomPixels
 */
function findBounds(topPixels, bottomPixels) {
  const out = {
    top: {
      left: {
        x: Number.MAX_SAFE_INTEGER,
        y: undefined,
      },
      right: {
        x: 0,
        y: undefined,
      },
    },
    bottom: {
      left: {
        x: Number.MAX_SAFE_INTEGER,
        y: undefined,
      },
      right: {
        x: 0,
        y: undefined,
      },
    },
  };

  for (let coordinate of topPixels) {
    const { x, y } = coordinate;
    if (x < out.top.left.x) {
      out.top.left.x = x;
      out.top.left.y = y;
    }
    if (x > out.top.right.x) {
      out.top.right.x = x;
      out.top.right.y = y;
    }
  }

  for (let coordinate of bottomPixels) {
    const { x, y } = coordinate;
    if (x < out.bottom.left.x) {
      out.bottom.left.x = x;
      out.bottom.left.y = y;
    }
    if (x > out.bottom.right.x) {
      out.bottom.right.x = x;
      out.bottom.right.y = y;
    }
  }

  return out;
}

/* Not in use  */
async function getEdgeCanvasHelper(image, context) {
  const { width, height } = image;
  context.drawImage(image, 0, 0, width, height);
  let imageData = context.getImageData(0, 0, width, height);

  const columns = 450,
    rows = 320,
    data_type = jsfeat.U8_t;
  let img_u8 = new jsfeat.matrix_t(columns, rows, data_type);
  jsfeat.imgproc.grayscale(imageData.data, width, height, img_u8);

  let r = 3; // 0 -4
  let kernel_size = (r + 1) << 1;
  let low_threshold = 120; // 1 - 127
  let high_threshold = 120; // 1 - 127

  jsfeat.imgproc.gaussian_blur(img_u8, img_u8, kernel_size, 0);

  jsfeat.imgproc.canny(img_u8, img_u8, low_threshold, high_threshold);

  // render result back to canvas
  var data_u32 = new Uint32Array(imageData.data.buffer);
  var alpha = 0xff << 24;
  var i = img_u8.cols * img_u8.rows,
    pix = 0;
  while (--i >= 0) {
    pix = img_u8.data[i];
    data_u32[i] = alpha | (pix << 16) | (pix << 8) | pix;
  }

  // Draw canny
  context.putImageData(imageData, 0, 0, 0, 0, width, height);

  const edgeCanvas = new CanvasDataHelper({
    canvasWidth: width,
    imageArray: imageData.data,
  });

  return edgeCanvas;
}

async function colorEdges(image, combinedCanvasInfo) {
  const { width, height } = image;
  const dimensions = {
    detectionWidth: width,
    detectionHeight: height,
  };

  const { context } = combinedCanvasInfo;
  context.drawImage(image, 0, 0, width, height);
  let imageData = context.getImageData(0, 0, width, height);

  const canvasData = new CanvasDataHelper({
    canvasWidth: dimensions.detectionWidth,
    imageArray: imageData.data,
  });

  for (let y = 5; y < height / 2; y++) {
    for (let x = 5; x < width - 10; x++) {
      const coor = { x, y };
      if (ImageAnalysis.isEdge(coor, canvasData)) {
        canvasData.recolor(coor, { r: 0, g: 255, b: 0 });
      }
    }
  }

  context.putImageData(
    imageData,
    0,
    0,
    0,
    0,
    dimensions.detectionWidth,
    dimensions.detectionHeight
  );
}

export { calculatedLossPercent, fullAnalysis, colorEdges, getEdgeCanvasHelper };
