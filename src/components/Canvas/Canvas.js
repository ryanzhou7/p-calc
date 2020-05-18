import React, { useEffect, useRef, useState } from "react";
import "./index.css";

function Canvas(props) {
  const { image, imageData } = props.image;
  const { canvasWidth, canvasHeight } = props.canvasDimensions;
  const { drawWidth, drawHeight } = props.drawDimensions;
  const [canvasContext, setCanvasContext] = props.canvasContext;
  const canvasRef = useRef(null);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    const context = canvas.getContext("2d");
    setCanvasContext(context);
  }, []);

  useEffect(() => {
    if (image == null || canvasContext == null) {
      return;
    }
    const { current: canvas } = canvasRef;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvasContext.drawImage(image, 0, 0, drawWidth, drawHeight);
  }, [image]);

  // useEffect(() => {
  //   const { current: canvas } = canvasRef;

  //   if (canvasContext == null || imageData == null) {
  //     return;
  //   }

  //   clear(canvasContext, canvas);
  //   canvasContext.putImageData(
  //     imageData,
  //     0,
  //     0,
  //     0,
  //     0,
  //     canvasWidth,
  //     canvasHeight
  //   );
  // }, [imageData, canvasWidth, canvasHeight]);

  return (
    <div>
      <canvas ref={canvasRef} className="border" />
    </div>
  );
}

export default Canvas;
