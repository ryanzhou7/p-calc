import Color from "color";
import Coordinate from "../models/coordinate";
import CanvasDataHelper from "../models/canvasData";

/**
 * Basic algorithm for red detection
 * @param {*} threshold
 */
function isRed(threshold) {
  return (color) => {
    const { r, g, b } = color;
    const [h, s, l] = Color.rgb(r, g, b).hsl().color;
    return (
      (h < threshold || h > 360 - threshold) && s >= 20 && (l >= 20 || l <= 90)
    );
  };
}

/**
 * Basic algorithm for blue detection
 * @param {*} threshold
 */
function isBlue(threshold) {
  return ({ r, g, b }) => b * 2 - (g + r) > 255 - threshold;
}

/**
 * Offsets access each value in a canvasContext.getImageData()
 */
const R_OFFSET = 0;
const G_OFFSET = 1;
const B_OFFSET = 2;

/**
 * Detects the color, recolors it, and return the newly recolored image / number of pixels colored
 * @param {*} detectionDimensions
 * @param {*} imageData
 * @param {*} isColor
 * @param {*} recolorHex
 */
async function detect(canvasContext, detectionDimensions, isColor, recolorHex) {
  const { detectionWidth, detectionHeight } = detectionDimensions;
  const imageData = canvasContext.getImageData(
    0,
    0,
    detectionWidth,
    detectionHeight
  );

  const newColor = hexToRgb(recolorHex);
  const detectedPixels = [];

  const canvasData = new CanvasDataHelper({
    canvasWidth: detectionWidth,
    imageArray: imageData.data,
  });

  // We use detection height / 2 so we only detect for the upper half of the image
  for (let y = 0; y < detectionHeight / 2; y++) {
    for (let x = 0; x < detectionWidth; x++) {
      const coordinate = { x, y };

      const rgbPixel = canvasData.rgbPixel(coordinate);

      if (isColor(rgbPixel)) {
        canvasData.recolor(coordinate, newColor);
        const detectedCoordinate = new Coordinate(coordinate);
        detectedPixels.push(detectedCoordinate);
      }
    }
  }

  return Promise.resolve([imageData, detectedPixels]);
}

async function colorAreaWithBounds(
  { width, height },
  outerCanvasInfo,
  innerCanvasInfo,
  combinedCanvasInfo,
  { leftX, rightX }
) {
  const imageData = combinedCanvasInfo.context.getImageData(
    0,
    0,
    width,
    height
  );

  const outerNumPixelsColored = await updateImageData(
    { width, height },
    imageData,
    { leftX, rightX },
    outerCanvasInfo
  );

  const innerNumPixelsColored = await updateImageData(
    { width, height },
    imageData,
    { leftX, rightX },
    innerCanvasInfo
  );

  return Promise.resolve({
    imageData,
    outerNumPixelsColored,
    innerNumPixelsColored,
  });
}

async function updateImageData(
  { width, height },
  imageData,
  { leftX, rightX },
  canvasInfo
) {
  const newColor = hexToRgb(canvasInfo.recolorHex);

  let {
    numDetectedPixels,
    existingPixels,
  } = getBoundedPixelInfo(canvasInfo.detectedPixels, { leftX, rightX });

  const isExistingPixel = containsXYKeyIn(getXYKey, existingPixels);

  for (let [, coordinate] of existingPixels) {
    if (coordinate != null) {
      const { x, y } = coordinate;

      for (let i = y; i < height / 2; i++) {
        if (!isExistingPixel(x, i)) {
          const redIndex = getIndex(x, i, width) + R_OFFSET;
          const greenIndex = getIndex(x, i, width) + G_OFFSET;
          const blueIndex = getIndex(x, i, width) + B_OFFSET;
          imageData.data[redIndex] = newColor.r;
          imageData.data[greenIndex] = newColor.g;
          imageData.data[blueIndex] = newColor.b;

          const currentKey = getXYKey(x, i);
          existingPixels.set(currentKey, null);
          numDetectedPixels++;
        }
      }
    }
  }

  return numDetectedPixels;
}

function getBoundedPixelInfo(detectedPixels, { leftX, rightX }) {
  const existingPixels = new Map();

  let numDetectedPixels = 0;

  for (let coordinate of detectedPixels) {
    const { x, y } = coordinate;
    if (x >= leftX && x <= rightX) {
      const key = getXYKey(x, y);
      existingPixels.set(key, coordinate);
      numDetectedPixels++;
    }
  }

  return {
    numDetectedPixels,
    existingPixels,
  };
}

/**
 * Get the unique key given the arguments
 * @param {*} x
 * @param {*} y
 */
function getXYKey(x, y) {
  return String(x) + String(y);
}

/**
 * Given x,y is the generated key in this map?
 * @param {*} x
 * @param {*} y
 * @param {*} map
 */
function containsXYKeyIn(getKey, map) {
  return (x, y) => {
    const key = getKey(x, y);
    return map.has(key);
  };
}

/**
 * #FFF 4 length hex or #FFFFFF 6 length to rgb
 * @param {*} hex
 */
function hexToRgb(hex) {
  let red = 0,
    green = 0,
    blue = 0;
  if (hex.length == 4) {
    red = "0x" + hex[1] + hex[1];
    green = "0x" + hex[2] + hex[2];
    blue = "0x" + hex[3] + hex[3];
  } else if (hex.length == 7) {
    red = "0x" + hex[1] + hex[2];
    green = "0x" + hex[3] + hex[4];
    blue = "0x" + hex[5] + hex[6];
  }
  return { r: red, g: green, b: blue };
}

/**
 * Get the index in a canvasContext.getImageData() array given the x, y, and width
 * @param {*} x
 * @param {*} y
 * @param {*} width
 */
function getIndex(x, y, width) {
  return (x + y * width) * 4;
}
export { detect, isRed, isBlue, colorAreaWithBounds };
