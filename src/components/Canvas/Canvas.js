import React, { useEffect, useRef, useState } from "react";
import { clear } from "../../utils/Canvas";
import "./index.css";

function Canvas(props) {
  const { imageSource, imageData } = props.image;
  const { canvasWidth, canvasHeight } = props.canvasDimensions;
  const { drawWidth, drawHeight } = props.drawDimensions;
  const canvasRef = useRef(null);
  const [canvasContext, setCanvasContext] = useState(null);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    const context = canvas.getContext("2d");
    setCanvasContext(context);
  }, []);

  useEffect(() => {
    if (imageSource == null || canvasContext == null) {
      return;
    }
    canvasContext.drawImage(imageSource, 0, 0, drawWidth, drawHeight);
  }, [imageSource]);

  useEffect(() => {
    const { current: canvas } = canvasRef;

    if (canvasContext == null || imageData == null) {
      return;
    }

    clear(canvasContext, canvas);
    canvasContext.putImageData(
      imageData,
      0,
      0,
      0,
      0,
      canvasWidth,
      canvasHeight
    );
  }, [imageData, canvasWidth, canvasHeight]);

  return (
    <div>
      <div>Canvas</div>
      <canvas ref={canvasRef} className="border" />
    </div>
  );
}

export default Canvas;
