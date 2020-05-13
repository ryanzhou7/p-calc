function isSameColor(r1, g1, b1, colorHex2, threshold) {
  const [r2, g2, b2] = hexToRgb(colorHex2);
  return Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2) < threshold;
}

const R_OFFSET = 0;
const G_OFFSET = 1;
const B_OFFSET = 2;

function detect(
  srcImage,
  ctx,
  detectionThreshold,
  newColorHex,
  targetColorHex
) {
  const [redRecolor, greenRecolor, blueRecolor] = hexToRgb(newColorHex);
  const detectedPixels = [];

  const { width, height } = srcImage;
  const imageData = ctx.getImageData(0, 0, width, height);
  const originalPixels = imageData.data.slice();

  // For every pixel of the src image
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const redIndex = getIndex(x, y, width) + R_OFFSET;
      const greenIndex = getIndex(x, y, width) + G_OFFSET;
      const blueIndex = getIndex(x, y, width) + B_OFFSET;

      const redValue = originalPixels[redIndex];
      const greenValue = originalPixels[greenIndex];
      const blueValue = originalPixels[blueIndex];

      if (
        isSameColor(
          redValue,
          greenValue,
          blueValue,
          targetColorHex,
          detectionThreshold
        )
      ) {
        imageData.data[redIndex] = Number(redRecolor);
        imageData.data[greenIndex] = Number(greenRecolor);
        imageData.data[blueIndex] = Number(blueRecolor);
        detectedPixels.push({ x: x, y: y });
      }
    }
  }

  return [imageData, detectedPixels];
}

function colorArea(srcImage, ctx, newColorHex, detectedPixels, xAxisYPoint) {
  const [redRecolor, greenRecolor, blueRecolor] = hexToRgb(newColorHex);
  const { width, height } = srcImage;
  const imageData = ctx.getImageData(0, 0, width, height);
  let numPixelsColor = 0;

  let maxY = 0;
  for (let coordinate of detectedPixels) {
    const { y } = coordinate;
    maxY = Math.max(y, maxY);
  }

  for (let coordinate of detectedPixels) {
    const { x, y } = coordinate;
    for (let i = y; i < maxY + xAxisYPoint; i++) {
      const redIndex = getIndex(x, i, width) + R_OFFSET;
      const greenIndex = getIndex(x, i, width) + G_OFFSET;
      const blueIndex = getIndex(x, i, width) + B_OFFSET;
      imageData.data[redIndex] = redRecolor;
      imageData.data[greenIndex] = greenRecolor;
      imageData.data[blueIndex] = blueRecolor;
      numPixelsColor++;
    }
  }

  return [imageData, numPixelsColor];
}

const rgbToHex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

function hexToRgb(h) {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

    // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  return [r, g, b];
}

function getIndex(x, y, width) {
  return (x + y * width) * 4;
}

export { detect, colorArea };
