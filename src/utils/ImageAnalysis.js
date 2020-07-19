import Coordinate from "../models/coordinate";
import CanvasDataHelper from "../models/canvasData";

/**
 * Offsets access each value in a canvasContext.getImageData()
 */
const R_OFFSET = 0;
const G_OFFSET = 1;
const B_OFFSET = 2;

// Increase to relax restrictions
const SEED_THRESHOLD_ADJUST = 45;
const IS_SIMILAR_PIXEL_THRESHOLD = 45;

async function detectGrow(canvasContext, detectionDimensions, recolorHex) {
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

  const seedCoordinate = await findSeed(canvasData, detectionDimensions);
  const detectedPixels = await getDetectedPixels(canvasData, seedCoordinate);

  for (let coor of detectedPixels) {
    canvasData.recolor(coor, newColor);
  }

  return Promise.resolve([imageData, detectedPixels]);
}

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

async function getDetectedPixels(canvasData, seedCoordinate) {
  const { x, y } = seedCoordinate;
  const detectedPixels = [];
  detectedPixels.push(seedCoordinate);

  let queue = [];
  queue.push(seedCoordinate);
  const visited = new Set();

  while (queue.length > 0) {
    const currentCoor = queue.pop();

    const key = getXYKey(currentCoor.x, currentCoor.y);
    visited.add(key);
    const neighbors = getNeighbors(currentCoor);

    for (let neighborCoor of neighbors) {
      const key = getXYKey(neighborCoor.x, neighborCoor.y);
      if (
        !visited.has(key) &&
        isSimiliar(currentCoor, neighborCoor, canvasData, seedCoordinate)
      ) {
        queue.push(neighborCoor);
        detectedPixels.push(neighborCoor);
        visited.add(key);
      }
    }
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

const neighborsDelta = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
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
export { detectGrow, colorAreaWithBounds, getDetectedPixels };
