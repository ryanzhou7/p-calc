import * as ImageAnalysis from "../../utils/ImageAnalysis";
import * as combinedCanvasInfoReducer from "../../redux/combinedCanvasInfoReducer";
import CanvasDataHelper from "../../models/canvasData";

async function fullAnalysis(image, combinedCanvasInfo) {
  const { width, height } = image;
  const dimensions = {
    detectionWidth: width,
    detectionHeight: height,
  };

  // setup
  const { context } = combinedCanvasInfo;
  context.drawImage(image, 0, 0, width, height);
  const imageData = context.getImageData(0, 0, width, height);

  const canvasData = new CanvasDataHelper({
    canvasWidth: dimensions.detectionWidth,
    imageArray: imageData.data,
  });

  // Get "max" intense coordinate
  const maxCoor = await findMax(canvasData, dimensions);
  const maxDetectedPixels = await ImageAnalysis.getDetectedPixels(
    canvasData,
    maxCoor
  );

  // find next Max
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

  const allDetectedPixels = [...maxDetectedPixels, ...nextMaxdetectedPixels];

  for (let coor of allDetectedPixels) {
    canvasData.recolor(coor, { r: 0, g: 0, b: 255 });
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

  return Promise.resolve([context]);
}

async function findNextMax(maxCoor, detectedPixels, canvasData, width, height) {
  const photoOriginY = height / 2;
  const distanceFromOrigin = Math.abs(maxCoor.y - photoOriginY);
  const distanceFromTop = maxCoor.y;
  const isDownwardsSearch = distanceFromTop > distanceFromOrigin;
  const middleX = width / 2;

  // If we are search downwards we seek the boundary that is the biggest y, hence initial to smal
  let boundary = isDownwardsSearch ? Number.MAX_VALUE : Number.MIN_VALUE;
  const boundaryComparison = isDownwardsSearch ? Math.min : Math.max;

  for (let { y } of detectedPixels) {
    boundary = boundaryComparison(boundary, y);
  }

  let startY = isDownwardsSearch ? 0 : boundary;
  let endY = isDownwardsSearch ? boundary : 0;

  let coor = { x: middleX };
  let intensity = 0;

  while (startY !== endY) {
    let y = startY;
    const coordinate = { x: middleX, y };
    const rgbPixel = canvasData.rgbPixel(coordinate);

    const value = rgbPixel.r * 2 - rgbPixel.b - rgbPixel.g;
    if (value > intensity) {
      coor.y = y;
      intensity = value;
    }
    if (isDownwardsSearch) {
      startY++;
    } else {
      startY--;
    }
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
  const leftX = await findLeftCutOff(outerDetectedPixels, innerDetectedPixels);
  const rightX = await findRightCutOff(
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

async function findLeftCutOff(outerDetectedPixels, innerDetectedPixels) {
  let smallestOuter = Number.MAX_SAFE_INTEGER;
  for (let coordinate of outerDetectedPixels) {
    const { x } = coordinate;
    smallestOuter = Math.min(smallestOuter, x);
  }

  let smallestInner = Number.MAX_SAFE_INTEGER;
  for (let coordinate of innerDetectedPixels) {
    const { x } = coordinate;
    smallestInner = Math.min(smallestInner, x);
  }

  return Math.max(smallestOuter, smallestInner);
}
async function findRightCutOff(outerDetectedPixels, innerDetectedPixels) {
  let largestOuter = 0;
  for (let coordinate of outerDetectedPixels) {
    const { x } = coordinate;
    largestOuter = Math.max(largestOuter, x);
  }

  let largestInner = 0;
  for (let coordinate of innerDetectedPixels) {
    const { x } = coordinate;
    largestInner = Math.max(largestInner, x);
  }

  return Math.min(largestOuter, largestInner);
}

export { calculatedLossPercent, combinedAnalysis, fullAnalysis };
