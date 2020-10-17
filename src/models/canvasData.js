/**
 * Offsets access each value in a canvasContext.getImageData()
 */
const R_OFFSET = 0;
const G_OFFSET = 1;
const B_OFFSET = 2;
const ALPHA_OFFSET = 3;

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
    if (redValue !== 0 && greenValue !== 0 && blueValue !== 0) {
      const alphaIndex = getIndex(x, y, this.canvasWidth) + ALPHA_OFFSET;
      const alphaValue = this.imageArray[alphaIndex];
    }
    return { r: redValue, g: greenValue, b: blueValue };
  }

  rgbaPixel({ x, y }) {
    const rgb = this.rgbPixel({ x, y });
    const alphaIndex = getIndex(x, y, this.canvasWidth) + ALPHA_OFFSET;
    const alphaValue = this.imageArray[alphaIndex];
    rgb.alpha = alphaValue;
    return rgb;
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

  tint(pixelAtCoordinate, newColor) {
    const { r: newR, g: newG, b: newB } = newColor;

    const { x, y } = pixelAtCoordinate;

    const redIndex = getIndex(x, y, this.canvasWidth) + R_OFFSET;
    const greenIndex = getIndex(x, y, this.canvasWidth) + G_OFFSET;
    const blueIndex = getIndex(x, y, this.canvasWidth) + B_OFFSET;

    const r = this.imageArray[redIndex];
    const g = this.imageArray[greenIndex];
    const b = this.imageArray[blueIndex];

    this.imageArray[redIndex] += this.tintDelta(r, newR);
    this.imageArray[greenIndex] += this.tintDelta(g, newG);
    this.imageArray[blueIndex] += this.tintDelta(b, newB);
  }

  tintDelta(start, end) {
    const tintFactor = 3;
    return (end - start) / 3;
  }
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
