function downloadImageData(width, height, imageData) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const testContext = canvas.getContext("2d");
  testContext.putImageData(imageData, 0, 0, 0, 0, width, height);

  const a = document.createElement("a");
  const name = "image.jpeg";
  a.href = canvas.toDataURL(name, 1.0); // 1.0 for max quality
  a.download = name;
  a.click();
}

export { downloadImageData };
