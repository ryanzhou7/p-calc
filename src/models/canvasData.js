/**
 * Offsets access each value in a canvasContext.getImageData()
 */
const R_OFFSET = 0;
const G_OFFSET = 1;
const B_OFFSET = 2;

export default class CanvasDataHelper {
  constructor({ canvasWidth, imageArray }) {
    this.canvasWidth = canvasWidth;
    this.imageArray = imageArray;
  }

  rgbPixel({ x, y }) {
    const redIndex = getIndex(x, y, this.canvasWidth) + R_OFFSET;
    const greenIndex = getIndex(x, y, this.canvasWidth) + G_OFFSET;
    const blueIndex = getIndex(x, y, this.canvasWidth) + B_OFFSET;

    const redValue = this.imageArray[redIndex];
    const greenValue = this.imageArray[greenIndex];
    const blueValue = this.imageArray[blueIndex];
    return { r: redValue, g: greenValue, b: blueValue };
  }

  recolor(pixelAtCoordinate, newColor) {
    const { r, g, b } = newColor;
    const { x, y } = pixelAtCoordinate;

    const redIndex = getIndex(x, y, this.canvasWidth) + R_OFFSET;
    const greenIndex = getIndex(x, y, this.canvasWidth) + G_OFFSET;
    const blueIndex = getIndex(x, y, this.canvasWidth) + B_OFFSET;

    this.imageArray[redIndex] = Number(r);
    this.imageArray[greenIndex] = Number(g);
    this.imageArray[blueIndex] = Number(b);
  }

  tint(pixelAtCoordinate, newColor) {}
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
