import React, { useEffect, useRef } from "react";
import "./index.css";

function Canvas(props) {
  const image = props.image;
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
    if (image == null || canvasContext == null || canvasRef == null) {
      return;
    }
    const { current: canvas } = canvasRef;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvasContext.drawImage(image, 0, 0, drawWidth, drawHeight);

    const smallerSide = Math.min(drawWidth, drawHeight);
    canvasContext.beginPath();
    canvasContext.lineWidth = "2";
    canvasContext.strokeStyle = "green";
    canvasContext.rect(0, 0, smallerSide, smallerSide);
    canvasContext.stroke();
  }, [image, drawWidth, drawHeight, canvasWidth, canvasHeight]);

  return (
    <div>
      <canvas ref={canvasRef} className="border" />
    </div>
  );
}

export default Canvas;
