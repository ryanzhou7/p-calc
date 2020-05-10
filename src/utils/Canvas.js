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
  const { x: xOffset, y: yOffset } = axisCoordinates;
  const { width: canvasWidth, height: canvasHeight } = canvas;
  const originX = 0;
  const originY = canvasHeight / 2 + yOffset;
  context.beginPath();
  context.moveTo(originX, originY + yOffset);
  context.lineTo(originX + canvasWidth, originY + yOffset);
  context.strokeStyle = "#FF0000";
  context.stroke();
}

function drawImage(context, canvas, image) {
  if (canvas == null || image == null) {
    return;
  }
  const { width, height } = image;
  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);
}

function degreesToRadians(degrees) {
  return degrees * 0.01745;
}

function clear(context, canvas) {
  if (canvas == null || context == null) {
    return;
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
}

export { drawRotated, drawAxis, drawImage, clear };
