import Coordinate from "../models/coordinate";
import CanvasDataHelper from "../models/canvasData";
import * as math from "mathjs";

/**
 * Offsets access each value in a canvasContext.getImageData()
 */
const R_OFFSET = 0;
const G_OFFSET = 1;
const B_OFFSET = 2;

// Increase to relax restrictions
const SEED_THRESHOLD_ADJUST = 60;
const IS_SIMILAR_PIXEL_THRESHOLD = 60;

async function findSeed(canvasData, { detectionWidth, detectionHeight }) {
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

/*
 * Laplacian
 */

async function getLaplacianArray(
  canvasData,
  { detectionWidth, detectionHeight }
) {
  const laplacianArray = [];

  // Calculate requires to look one over
  for (let y = 1; y < detectionHeight - 1; y++) {
    const row = [];
    for (let x = 1; x < detectionWidth - 1; x++) {
      const coordinate = { x, y };
      const value = await calcLaplacianValue(canvasData, coordinate);
      row.push(value);
    }

    laplacianArray.push(row);
  }

  return laplacianArray;
}

async function calcLaplacianValue(canvasData, coordinate) {
  const { x, y } = coordinate;
  const rgbPixel = canvasData.rgbPixel(coordinate);

  let sum = -4 * rgbPixel.r;

  for (let delta of neighborsDelta) {
    const [deltaX, deltaY] = delta;
    const neighbor = new Coordinate({ x: deltaX + x, y: deltaY + y });
    const rgbPixel = canvasData.rgbPixel(neighbor);
    sum += rgbPixel.r;
  }
  return sum;
}

const red = { r: 255, g: 0, b: 0 };
const green = { r: 0, g: 255, b: 0 };
const blue = { r: 0, g: 0, b: 255 };
async function getDetectedPixels(
  canvasData,
  seedCoordinate,
  edgeCanvas,
  dimensions
) {
  const { x, y } = seedCoordinate;
  const detectedPixels = [];
  detectedPixels.push(seedCoordinate);

  let queue = [];
  queue.push(seedCoordinate);
  const visited = new Set();
  visited.add(seedCoordinate);
  let count = 0;
  while (queue.length > 0) {
    const currentCoor = queue.pop();

    const key = getXYKey(currentCoor.x, currentCoor.y);
    const neighbors = getNeighbors(currentCoor);

    for (let neighborCoor of neighbors) {
      const key = getXYKey(neighborCoor.x, neighborCoor.y);

      if (
        !visited.has(key) &&
        isSimiliar(currentCoor, neighborCoor, canvasData, seedCoordinate) &&
        isWithinBoundary(neighborCoor, dimensions)
      ) {
        queue.push(neighborCoor);
        detectedPixels.push(neighborCoor);
      }
      visited.add(key);
    }
    count++;
  }

  return detectedPixels;
}

function isSimiliar(origin, suspect, canvasData, seedCoordinate) {
  const seedRgb = canvasData.rgbPixel(seedCoordinate);
  const seedThreshold = seedRgb.r * 2 - seedRgb.g - seedRgb.b;

  const originRgb = canvasData.rgbPixel(origin);
  const suspectRgb = canvasData.rgbPixel(suspect);

  return (
    // check if this is "red"
    suspectRgb.r * 2 - suspectRgb.g - suspectRgb.b + SEED_THRESHOLD_ADJUST >
      seedThreshold &&
    // check if each of these values are not too different from the origin
    Math.abs(originRgb.r - suspectRgb.r) < IS_SIMILAR_PIXEL_THRESHOLD &&
    Math.abs(originRgb.g - suspectRgb.g) < IS_SIMILAR_PIXEL_THRESHOLD &&
    Math.abs(originRgb.b - suspectRgb.b) < IS_SIMILAR_PIXEL_THRESHOLD
  );
}

function isWithinBoundary(coor, dimensions) {
  const { x, y } = coor;
  return x > 0 && x < dimensions.width && y > 0 && y < dimensions.height;
}

const laplacianOperator = [
  [1, 1, 1],
  [1, -8, 1],
  [1, 1, 1],
];

function findMatrixMax(matrix) {
  let max = Number.MIN_VALUE;
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      max = Math.max(max, matrix[r][c]);
    }
  }
  return max;
}

function isZeroCrossing(matrix) {
  const upLeft = matrix[0][0];
  const downRight = matrix[2][2];

  const upMiddle = matrix[0][1];
  const downMiddle = matrix[2][1];

  const downLeft = matrix[2][0];
  const upRight = matrix[0][2];

  const middleLeft = matrix[1][0];
  const middleRight = matrix[1][2];

  const max = findMatrixMax(matrix);
  return (
    (isDifferentSign(upLeft, downRight) &&
      isDifferentAboveThreshold(upLeft, downRight, max)) ||
    (isDifferentSign(upMiddle, downMiddle) &&
      isDifferentAboveThreshold(upMiddle, downMiddle, max)) ||
    (isDifferentSign(downLeft, upRight) &&
      isDifferentAboveThreshold(downLeft, upRight, max)) ||
    (isDifferentSign(middleLeft, middleRight) &&
      isDifferentAboveThreshold(middleLeft, middleRight, max))
  );
}

function isDifferentSign(value1, value2) {
  return (value1 < 0 && value2 > 0) || (value1 > 0 && value2 < 0);
}

function isDifferentAboveThreshold(value1, value2, max) {
  return Math.abs(value1 - value2) > 0.3 * max;
}

function isEdge(coor, canvasData) {
  const rgbPixel = canvasData.rgbPixel(coor);
  // if all black then it is a edge pixel
  return rgbPixel.r === 255 && rgbPixel.g === 255 && rgbPixel.b === 255;
}

const neighborsDelta = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
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

  const outerNumPixelsColored = await updateImageDataOld(
    { width, height },
    imageData,
    { leftX, rightX },
    outerCanvasInfo
  );

  const innerNumPixelsColored = await updateImageDataOld(
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
  canvasData,
  { leftX, rightX, height },
  recolor,
  detectedPixels
) {
  let numDetectedPixels = 0;
  const coloredPixels = new Set();
  for (let coordinate of detectedPixels) {
    const { x, y } = coordinate;

    // Go down a vertical line
    for (let i = y; i < height / 2; i++) {
      const key = getXYKey(x, i);
      const verticalCoordinate = { x, y: i };

      // Color this pixel only if it has not been colored before and is within bounds
      if (!coloredPixels.has(key) && leftX <= x && x <= rightX) {
        coloredPixels.add(key);
        canvasData.recolor(verticalCoordinate, recolor);
        numDetectedPixels++;
      }
    }
  }

  return numDetectedPixels;
}

async function updateImageDataOld(
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
export { colorAreaWithBounds, getDetectedPixels, updateImageData, isEdge };
