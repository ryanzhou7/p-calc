import * as Canvas from "../../utils/Canvas";

async function resetCanvas(
  event,
  canvasContext,
  canvasWidth,
  canvasHeight,
  image,
  setNumPixelsColored
) {
  event.preventDefault();
  Canvas.setWithImage(canvasContext, canvasWidth, canvasHeight, image);
  setNumPixelsColored(0);
}

export default resetCanvas;
