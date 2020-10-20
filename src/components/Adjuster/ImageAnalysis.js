import Coordinate from "../../models/coordinate";

const colorSpace = require("color-space");
const DeltaE = require("delta-e");

async function getDetectedPixels(
  canvasData,
  seedCoordinate,
  dimensions,
  threshold
) {
  const detectedPixels = [];
  detectedPixels.push(seedCoordinate);

  let queue = [];
  queue.push(seedCoordinate, seedCoordinate);
  const visited = new Set();
  visited.add(seedCoordinate);
  while (queue.length > 0) {
    const currentCoor = queue.pop();
    const neighbors = getNeighbors(currentCoor);

    for (let neighborCoor of neighbors) {
      const key = getXYKey(neighborCoor.x, neighborCoor.y);

      if (
        isWithinBoundary(neighborCoor, dimensions) &&
        !visited.has(key) &&
        isSimiliar(neighborCoor, canvasData, seedCoordinate, threshold)
        //!isEdge(neighborCoor, canvasData)
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
  return getDeltaBetween(canvasData, suspect, seedCoordinate) < threshold;
}

function getDeltaBetween(canvasData, coor1, coor2) {
  const coor1Rgb = canvasData.rgbPixel(coor1);
  const coor1Lab = colorSpace.rgb.lab([coor1Rgb.r, coor1Rgb.g, coor1Rgb.b]);
  const coor1LabObj = { L: coor1Lab[0], A: coor1Lab[1], B: coor1Lab[2] };
  const coor2Rgb = canvasData.rgbPixel(coor2);

  const coor2Lab = colorSpace.rgb.lab([coor2Rgb.r, coor2Rgb.g, coor2Rgb.b]);

  const coor2LabObj = {
    L: coor2Lab[0],
    A: coor2Lab[1],
    B: coor2Lab[2],
  };

  return DeltaE.getDeltaE00(coor1LabObj, coor2LabObj);
}

function isWithinBoundary(coor, dimensions) {
  const { x, y } = coor;
  return x > 0 && x < dimensions.width && y > 0 && y < dimensions.height;
}

function isEdge(coor, canvasData) {
  const x = coor.x;
  const y = coor.y;
  let topLeft = getDeltaBetween(canvasData, coor, { x: x - 1, y: y - 1 });
  let top = getDeltaBetween(canvasData, coor, { x: x, y: y - 1 });
  let topRight = getDeltaBetween(canvasData, coor, { x: x + 1, y: y + 1 });
  let right = getDeltaBetween(canvasData, coor, { x: x + 1, y });
  let bottomRight = getDeltaBetween(canvasData, coor, { x: x + 1, y: y + 1 });
  let bottom = getDeltaBetween(canvasData, coor, { x, y: y + 1 });
  let bottomLeft = getDeltaBetween(canvasData, coor, { x: x - 1, y: y + 1 });
  let left = getDeltaBetween(canvasData, coor, { x: x - 1, y: y + 1 });

  const max = Math.max(
    topLeft,
    top,
    topRight,
    right,
    bottomRight,
    bottom,
    bottomLeft,
    left
  );

  return (
    isDifferentAboveThreshold(topLeft, bottomRight, max) ||
    isDifferentAboveThreshold(top, bottom, max) ||
    isDifferentAboveThreshold(left, right, max) ||
    isDifferentAboveThreshold(topRight, bottomLeft, max)
  );
}

function isDifferentAboveThreshold(value1, value2, max) {
  return Math.abs(value1 - value2) > 9;
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

export { getDetectedPixels, updateImageData, retinexWhiteBalance };
