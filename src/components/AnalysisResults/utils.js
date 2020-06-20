import * as ImageAnalysis from "../../utils/ImageAnalysis";
import * as combinedCanvasInfoReducer from "../../redux/combinedCanvasInfoReducer";

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

export { calculatedLossPercent, combinedAnalysis };
