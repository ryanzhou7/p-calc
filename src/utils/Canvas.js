function drawRotated(context, canvas, degrees, image) {
  if (canvas == null || image == null || context == null) {
    return;
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate(degreesToRadians(degrees));
  context.drawImage(image, -image.width / 2, -image.height / 2);
  context.restore();
}

function drawAxis(context, canvas, axisCoordinates, image) {
  if (canvas == null || image == null) {
    return;
  }

  const { x, y } = axisCoordinates;
  const { width: canvasWidth, height: canvasHeight } = canvas;
  const originX = y;
  const originY = canvasHeight / 2;
  context.beginPath();
  context.moveTo(originX, originY);
  context.lineTo(canvasWidth + x, originY);
  context.strokeStyle = "#FF0000";
  context.stroke();

  function clearPrevious() {}
}

function degreesToRadians(degrees) {
  return degrees * 0.01745;
}

export { drawRotated, drawAxis };
