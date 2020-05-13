const WIDTH_PADDING = 10;

function drawRotated(context, canvas, degrees, image) {
  if (canvas == null || image == null || context == null) {
    return;
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.save();
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate(degreesToRadians(degrees));

  const width = window.innerWidth - WIDTH_PADDING;
  const height = (image.height / width) * width;
  context.drawImage(image, -width / 2, -height / 2);
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

  const windowWidth = window.innerWidth - WIDTH_PADDING;
  const { width, height } = image;
  const proportionalHeight = (height / width) * windowWidth;

  // TODO for it to work on desktop just use canvas.width = width and height
  canvas.width = windowWidth;
  canvas.height = proportionalHeight;
  context.drawImage(image, 0, 0, windowWidth, proportionalHeight);
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
