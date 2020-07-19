import * as ImageAnalysis from "../../utils/ImageAnalysis";
import * as combinedCanvasInfoReducer from "../../redux/combinedCanvasInfoReducer";
import CanvasDataHelper from "../../models/canvasData";

async function fullAnalysis(image, combinedCanvasInfo) {
  const { width, height } = image;
  const dimensions = {
    detectionWidth: width,
    detectionHeight: height,
  };

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
   * Max / Next Max
   */

  // Max
  const maxCoor = await findMax(canvasData, dimensions);
  const maxDetectedPixels = await ImageAnalysis.getDetectedPixels(
    canvasData,
    maxCoor
  );

  // Next max
  const nextMaxCoor = await findNextMax(
    maxCoor,
    maxDetectedPixels,
    canvasData,
    width,
    height
  );
  const nextMaxdetectedPixels = await ImageAnalysis.getDetectedPixels(
    canvasData,
    nextMaxCoor
  );

  /*
   * Max / Next Max -> top / bottom
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
  const { left: leftX, right: rightX } = await findCutOff(
    topDetectedPixels,
    bottomDetectedPixels
  );

  // Recoloring
  const recolor = { r: 0, g: 255, b: 0 };
  const topPixelsCount = await ImageAnalysis.updateImageData(
    canvasData,
    { leftX, rightX, height },
    recolor,
    topDetectedPixels
  );

  const bottomPixelsCount = await ImageAnalysis.updateImageData(
    canvasData,
    { leftX, rightX, height },
    { r: 0, g: 255, b: 255 },
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

  return Promise.resolve({ topPixelsCount, bottomPixelsCount, context });
}

async function findNextMax(maxCoor, detectedPixels, canvasData, width, height) {
  // Setup
  const photoOriginY = height / 2;
  const middleX = width / 2;

  const distanceFromOrigin = Math.abs(maxCoor.y - photoOriginY);
  const distanceFromTop = maxCoor.y;

  // If the already found coor's distance from the bottom (origin) is less than the tops then
  // it's closer to the bottom and we are searching from top to bottom
  const isTopToBottomSearch = distanceFromOrigin < distanceFromTop;

  // If we are search from top to bottom it means the current max is the bottom
  // Hence, from the detected bottom line when need to find the biggest y as the boundary
  let boundary = isTopToBottomSearch ? Number.MIN_VALUE : Number.MAX_VALUE;
  const boundaryComparator = isTopToBottomSearch ? Math.max : Math.min;

  for (let { y } of detectedPixels) {
    boundary = boundaryComparator(boundary, y);
  }

  // Ensure that boundary is least some distance from the top / bottom
  boundary += isTopToBottomSearch ? -5 : 5;

  let coor = { x: middleX };
  let intensity = 0;

  let y = isTopToBottomSearch ? 0 : photoOriginY;

  while (y !== boundary) {
    const coordinate = { x: middleX, y };
    const rgbPixel = canvasData.rgbPixel(coordinate);

    const value = rgbPixel.r * 2 - rgbPixel.b - rgbPixel.g;
    if (value > intensity) {
      coor.y = y;
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
  for (let y = 0; y < detectionHeight / 2; y++) {
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
  return percentage.toFixed(4);
}

async function combinedAnalysis(
  outerCanvasInfo,
  innerCanvasInfo,
  combinedCanvasInfo,
  canvasDimensions,
  dispatch
) {
  const outerDetectedPixels = outerCanvasInfo.detectedPixels;
  const innerDetectedPixels = innerCanvasInfo.detectedPixels;
  const { left: leftX, right: rightX } = await findCutOff(
    outerDetectedPixels,
    innerDetectedPixels
  );

  const {
    imageData,
    outerNumPixelsColored,
    innerNumPixelsColored,
  } = await ImageAnalysis.colorAreaWithBounds(
    canvasDimensions,
    outerCanvasInfo,
    innerCanvasInfo,
    combinedCanvasInfo,
    { leftX, rightX }
  );

  combinedCanvasInfo.context.putImageData(
    imageData,
    0,
    0,
    0,
    0,
    canvasDimensions.width,
    canvasDimensions.height
  );
  dispatch(combinedCanvasInfoReducer.setContext(combinedCanvasInfo.context));

  dispatch(
    combinedCanvasInfoReducer.setNumColoredInnerPixels(innerNumPixelsColored)
  );
  dispatch(
    combinedCanvasInfoReducer.setNumColoredOuterPixels(outerNumPixelsColored)
  );
}

async function findCutOff(detectedPixels1, detectedPixels2) {
  let smallestX1 = Number.MAX_VALUE;
  let smallestX2 = Number.MAX_VALUE;

  let largestX1 = 0;
  let largestX2 = 0;

  for (let coordinate of detectedPixels1) {
    const { x } = coordinate;
    smallestX1 = Math.min(smallestX1, x);
    largestX1 = Math.max(largestX1, x);
  }

  for (let coordinate of detectedPixels2) {
    const { x } = coordinate;
    smallestX2 = Math.min(smallestX2, x);
    largestX2 = Math.max(largestX2, x);
  }

  return {
    left: Math.max(smallestX1, smallestX2),
    right: Math.min(largestX1, largestX2),
  };
}

export { calculatedLossPercent, combinedAnalysis, fullAnalysis };