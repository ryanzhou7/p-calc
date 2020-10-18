import Coordinate from "../../models/coordinate";

const colorSpace = require("color-space");
const DeltaE = require("delta-e");

const red = { r: 255, g: 0, b: 0 };
const green = { r: 0, g: 255, b: 0 };
const blue = { r: 0, g: 0, b: 255 };
async function getDetectedPixels(
  canvasData,
  seedCoordinate,
  edgeCanvas,
  dimensions,
  threshold
) {
  const { x, y } = seedCoordinate;
  const detectedPixels = [];
  detectedPixels.push(seedCoordinate);

  let queue = [];
  queue.push(seedCoordinate);
  const visited = new Set();
  visited.add(seedCoordinate);
  while (queue.length > 0) {
    const currentCoor = queue.pop();

    const key = getXYKey(currentCoor.x, currentCoor.y);
    const neighbors = getNeighbors(currentCoor);

    for (let neighborCoor of neighbors) {
      const key = getXYKey(neighborCoor.x, neighborCoor.y);

      if (
        isWithinBoundary(neighborCoor, dimensions) &&
        !visited.has(key) &&
        isSimiliar(neighborCoor, canvasData, seedCoordinate, threshold)
      ) {
        queue.push(neighborCoor);
        detectedPixels.push(neighborCoor);
      }
      visited.add(key);
    }
  }

  return detectedPixels;
}

async function retinexWhiteBalance(canvasData, dimensions) {
  const { width, height } = dimensions;

  let maxR = 0;
  let maxG = 0;
  let maxB = 0;

  let count = 0;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height / 2; y++) {
      // Only count pixels within the circle
      const distance = Math.sqrt(Math.pow(x - 200, 2) + Math.pow(y - 200, 2));

      if (distance < 188) {
        const rgb = canvasData.rgbPixel({ x, y });
        maxR = Math.max(rgb.r, maxR);
        maxG = Math.max(rgb.g, maxG);
        maxB = Math.max(rgb.b, maxB);
        count++;
      }
    }
  }

  const rCoeff = maxG / maxR;
  const bCoeff = maxG / maxB;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height / 2; y++) {
      const rgb = canvasData.rgbPixel({ x, y });
      const r = parseInt(rgb.r * rCoeff);
      const g = rgb.g;
      const b = parseInt(rgb.b * bCoeff);
      canvasData.recolor({ x, y }, { r, g, b });
    }
  }
}

function isSimiliar(suspect, canvasData, seedCoordinate, threshold) {
  const seedRgb = canvasData.rgbPixel(seedCoordinate);
  const seedLab = colorSpace.rgb.lab([seedRgb.r, seedRgb.g, seedRgb.b]);
  const seedLabObj = { L: seedLab[0], A: seedLab[1], B: seedLab[2] };
  const suspectRgb = canvasData.rgbPixel(suspect);

  const suspectLab = colorSpace.rgb.lab([
    suspectRgb.r,
    suspectRgb.g,
    suspectRgb.b,
  ]);

  const suspectLabObj = {
    L: suspectLab[0],
    A: suspectLab[1],
    B: suspectLab[2],
  };

  return DeltaE.getDeltaE00(seedLabObj, suspectLabObj) < threshold;
}

function isWithinBoundary(coor, dimensions) {
  const { x, y } = coor;
  return x > 0 && x < dimensions.width && y > 0 && y < dimensions.height;
}

function isEdge(coor, canvasData) {
  const rgbPixel = canvasData.rgbPixel(coor);
  // if all black then it is a edge pixel
  return rgbPixel.r === 255 && rgbPixel.g === 255 && rgbPixel.b === 255;
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

    // Go down a vertical line, stop slightly less than the middle
    for (let i = y; i < height / 2; i++) {
      const key = getXYKey(x, i);
      const verticalCoordinate = { x, y: i };

      // Color this pixel only if it has not been colored before and is within bounds
      if (!coloredPixels.has(key) && leftX <= x && x <= rightX) {
        coloredPixels.add(key);
        canvasData.tint(verticalCoordinate, recolor);
        numDetectedPixels++;
      }
    }
  }

  return numDetectedPixels;
}

/**
 * Get the unique key given the arguments
 * @param {*} x
 * @param {*} y
 */
function getXYKey(x, y) {
  return String(x) + String(y);
}

export { getDetectedPixels, updateImageData, isEdge, retinexWhiteBalance };
