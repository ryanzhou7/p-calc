import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import "./index.css";

function Canvas(props) {
  const dispatch = useDispatch();
  const image = props.image;
  const { canvasWidth, canvasHeight } = props.canvasDimensions;
  const { drawWidth, drawHeight } = props.drawDimensions;
  const [canvasContext, setCanvasContext] = props.canvasContext;
  const { setCanvas } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    const context = canvas.getContext("2d");
    dispatch(setCanvasContext(context));
    dispatch(setCanvas(canvas));
  }, []);

  useEffect(() => {
    if (image == null || canvasContext == null) {
      return;
    }

    const { current: canvas } = canvasRef;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvasContext.drawImage(image, 0, 0, drawWidth, drawHeight);
  }, [image, drawWidth, drawHeight, canvasWidth, canvasHeight]);

  return (
    <div className="mx-auto">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default Canvas;
