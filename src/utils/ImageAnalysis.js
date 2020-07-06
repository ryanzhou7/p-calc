import Color from "color";
import Coordinate from "../models/coordinate";
import CanvasDataHelper from "../models/canvasData";
import * as math from "mathjs";

/**
 * Basic algorithm for red detection
 * @param {*} threshold
 */
function isRed(threshold) {
  return (color) => {
    const { r, g, b } = color;
    const [h, s, l] = Color.rgb(r, g, b).hsl().color;
    return r < 100 && g < 100 * b < 100;
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

// detectGrow
// detectGrow
// detectGrow

async function detectGrow(
  canvasContext,
  detectionDimensions,
  isOuterEdit,
  recolorHex
) {
  const { detectionWidth, detectionHeight } = detectionDimensions;
  const imageData = canvasContext.getImageData(
    0,
    0,
    detectionWidth,
    detectionHeight
  );

  const newColor = hexToRgb(recolorHex);
  const canvasData = new CanvasDataHelper({
    canvasWidth: detectionWidth,
    imageArray: imageData.data,
  });

  const seedCoordinate = await findRed(canvasData, detectionDimensions);
  const detectedPixels = await getDetectedPixels(canvasData, seedCoordinate);

  for (let coor of detectedPixels) {
    canvasData.recolor(coor, newColor);
  }

  return Promise.resolve([imageData, detectedPixels]);
}

async function findRed(canvasData, { detectionWidth, detectionHeight }) {
  for (let threshold = 0; threshold <= 200; threshold++) {
    // We use detection height / 2 so we only detect for the upper half of the image
    for (let y = 0; y < detectionHeight / 2; y++) {
      for (let x = 0; x < detectionWidth; x++) {
        const coordinate = { x, y };

        const rgbPixel = canvasData.rgbPixel(coordinate);
        if (isRedSimple(rgbPixel, threshold)) {
          return coordinate;
        }
      }
    }
  }
}

function isSimilar(rgbPixel1, rgbPixel2) {
  const { r: r1, g: g1, b: b1 } = rgbPixel1;
  const { r: r2, g: g2, b: b2 } = rgbPixel2;

  const [h1, s1, l1] = Color.rgb(r1, g1, b1).hsl().color;
  const [h2, s2, l2] = Color.rgb(r2, g2, b2).hsl().color;
  return Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) < 200;
}

async function getDetectedPixels(canvasData, seedCoordinate) {
  const detectedPixels = [];
  detectedPixels.push(seedCoordinate);

  let currentLevel = [];
  let nextLevel = [];
  const analyzedCoordinates = new Set();
  analyzedCoordinates.add(getXYKey(seedCoordinate.x, seedCoordinate.y));

  currentLevel.push(seedCoordinate);

  while (currentLevel.length > 0) {
    while (currentLevel.length > 0) {
      const currentCoor = currentLevel.pop();
      const rgbOriginPixel = canvasData.rgbPixel(currentCoor);

      const neighbors = getNeighbors(currentCoor);

      for (let neighborCoor of neighbors) {
        const rgbNeighborPixel = canvasData.rgbPixel(neighborCoor);

        const key = getXYKey(neighborCoor.x, neighborCoor.y);
        if (
          !analyzedCoordinates.has(key) &&
          isSimilar(rgbOriginPixel, rgbNeighborPixel)
        ) {
          nextLevel.push(neighborCoor);
          detectedPixels.push(neighborCoor);
        }
        analyzedCoordinates.add(key);
      }
    }
    currentLevel = nextLevel;
    nextLevel = [];
  }
  return detectedPixels;
}

const neighborsDelta = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
function getNeighbors(coordinate) {
  const neighbors = [];
  const { x, y } = coordinate;

  for (let delta of neighborsDelta) {
    const [deltaX, deltaY] = delta;
    neighbors.push(new Coordinate({ x: deltaX + x, y: deltaY + y }));
  }

  return neighbors;
}

function isRedSimple(color, threshold) {
  const { r, g, b } = color;
  return r + g + b <= threshold;
}

// detectGrow
// detectGrow
// detectGrow

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
export { detect, detectGrow, isRed, isBlue, colorAreaWithBounds };
