function isRed(threshold) {
  return (r, g, b) => r * 2 - (g + b) > threshold;
}

const R_OFFSET = 0;
const G_OFFSET = 1;
const B_OFFSET = 2;

async function detect(detectionDimensions, imageData, isColor, recolorHex) {
  const { detectionWidth, detectionHeight } = detectionDimensions;
  const [redRecolor, greenRecolor, blueRecolor] = hexToRgb(recolorHex);
  const detectedPixels = [];

  const originalPixels = imageData.data.slice();

  // For every pixel of the src image
  for (let y = 0; y < detectionHeight; y++) {
    for (let x = 0; x < detectionWidth; x++) {
      const redIndex = getIndex(x, y, detectionWidth) + R_OFFSET;
      const greenIndex = getIndex(x, y, detectionWidth) + G_OFFSET;
      const blueIndex = getIndex(x, y, detectionWidth) + B_OFFSET;

      const redValue = originalPixels[redIndex];
      const greenValue = originalPixels[greenIndex];
      const blueValue = originalPixels[blueIndex];

      if (isColor(redValue, greenValue, blueValue)) {
        imageData.data[redIndex] = Number(redRecolor);
        imageData.data[greenIndex] = Number(greenRecolor);
        imageData.data[blueIndex] = Number(blueRecolor);
        detectedPixels.push({ x: x, y: y });
      }
    }
  }

  return Promise.resolve([imageData, detectedPixels]);
}

async function colorArea(srcImage, ctx, newColorHex, detectedPixels) {
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
    for (let i = y; i < maxY; i++) {
      const redIndex = getIndex(x, i, width) + R_OFFSET;
      const greenIndex = getIndex(x, i, width) + G_OFFSET;
      const blueIndex = getIndex(x, i, width) + B_OFFSET;
      imageData.data[redIndex] = redRecolor;
      imageData.data[greenIndex] = greenRecolor;
      imageData.data[blueIndex] = blueRecolor;
      numPixelsColor++;
    }
  }

  return Promise.resolve([imageData, numPixelsColor]);
}

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

export { detect, colorArea, isRed };
