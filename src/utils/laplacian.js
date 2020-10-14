// Increase to relax restrictions
const SEED_THRESHOLD_ADJUST = 70;
const IS_SIMILAR_PIXEL_THRESHOLD = 100;

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

function isDifferentSign(value1, value2) {
  return (value1 < 0 && value2 > 0) || (value1 > 0 && value2 < 0);
}

function isDifferentAboveThreshold(value1, value2, max) {
  return Math.abs(value1 - value2) > 0.3 * max;
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
