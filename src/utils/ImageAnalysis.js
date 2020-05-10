function isRed(red, green, blue, redThreshold) {
  return red - green - blue > redThreshold;
}

function toPixels(srcImage, ctx, redThreshold, newColorHex) {
  const R_OFFSET = 0;
  const G_OFFSET = 1;
  const B_OFFSET = 2;
  const [redRecolor, greenRecolor, blueRecolor] = hexToRGB(newColorHex);

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

      if (isRed(redValue, greenValue, blueValue, redThreshold)) {
        imageData.data[redIndex] = Number(redRecolor);
        imageData.data[greenIndex] = Number(greenRecolor);
        imageData.data[blueIndex] = Number(blueRecolor);
      }
    }
  }

  return imageData;
}

function toPixelsO(srcImage, ctx, redThreshold, newColorHex) {
  const R_OFFSET = 0;
  const G_OFFSET = 1;
  const B_OFFSET = 2;
  const [redRecolor, greenRecolor, blueRecolor] = hexToRGB(newColorHex);

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

      if (isRed(redValue, greenValue, blueValue, redThreshold)) {
        imageData.data[redIndex] = Number(redRecolor);
        imageData.data[greenIndex] = Number(greenRecolor);
        imageData.data[blueIndex] = Number(blueRecolor);
      }
    }
  }

  return imageData;
}

function hexToRGB(h) {
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

export { toPixels };
