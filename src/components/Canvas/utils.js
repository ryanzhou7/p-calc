function downloadImageData(width, height, imageData) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const testContext = canvas.getContext("2d");
  testContext.putImageData(
    imageData,
    0,
    0,
    0,
    0,
    detectionWidth,
    detectionHeight
  );

  const a = document.createElement("a");
  const name = "image.jpeg";
  a.href = canvas.toDataURL(name, 1.0);
  a.download = name;
  a.click();
}

export { downloadImageData };
