import * as Canvas from "../../utils/Canvas";
import * as ImageAnalysis from "../../utils/ImageAnalysis";

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

async function recolorDetection(image, canvasContext, recolorHex) {
  const { width: detectionWidth, height: detectionHeight } = image;
  const detectionDimensions = { detectionWidth, detectionHeight };

  const [recoloredImageData, detectedPixels] = await ImageAnalysis.detectGrow(
    canvasContext,
    detectionDimensions,
    recolorHex
  );

  canvasContext.putImageData(
    recoloredImageData,
    0,
    0,
    0,
    0,
    detectionWidth,
    detectionHeight
  );

  return { canvasContext, detectedPixels };
}

export { resetCanvas, recolorDetection };
