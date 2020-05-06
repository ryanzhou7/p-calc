function isRed(red, green, blue) {
  return red - green - blue > 0;
}

function toPixels(srcImage, ctx) {
  const R_OFFSET = 0;
  const G_OFFSET = 1;
  const B_OFFSET = 2;

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
      if (isRed(redValue, greenValue, blueValue)) {
        imageData.data[redIndex] = 0;
        imageData.data[greenIndex] = 0;
        imageData.data[blueIndex] = 0;
      }
    }
  }

  return imageData;
}

function getIndex(x, y, width) {
  return (x + y * width) * 4;
}

export { toPixels };
