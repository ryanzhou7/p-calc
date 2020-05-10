import React, { useEffect, useRef, useState } from "react";
import { drawImage, clear } from "../../utils/Canvas";
import "./index.css";

function Canvas(props) {
  const [canvasContext, setCanvasContext] = useState(null);
  const canvasRef = useRef(null);
  const { image } = props;

  useEffect(() => {
    const { current: canvas } = canvasRef;
    const context = canvas.getContext("2d");
    setCanvasContext(context);
  }, []);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    clear(canvasContext, canvas);
    drawImage(canvasContext, canvas, image);
  }, [image]);

  return (
    <div>
      <div>Canvas</div>
      <canvas ref={canvasRef} className="preview-canvas" />
    </div>
  );
}

export default Canvas;
