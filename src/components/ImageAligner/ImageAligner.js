import React, { useRef, useState, useEffect } from "react";
import "./index.css";
import { drawRotated, drawAxis, drawImage, clear } from "../../utils/Canvas";
import { incrementBy, incrementOrginCoordinates } from "./utils";

function ImageAligner(props) {
  const { image } = props;
  const canvasRef = useRef(null);
  const [canvasContext, setCanvasContext] = useState(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [axisCoordinates, setAxisCoordinates] = useState({ x: 0, y: 0 });
  const [imageDOM, setImageDOM] = useState(null);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    clear(canvasContext, canvas);
    drawImage(canvasContext, canvas, image);
    setImageDOM(image);
  }, [image]);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    const context = canvas.getContext("2d");
    setCanvasContext(context);
  }, []);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    clear(canvasContext, canvas);
    drawRotated(canvasContext, canvas, rotationDegrees, imageDOM);
  }, [rotationDegrees]);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    clear(canvasContext, canvas);
    drawRotated(canvasContext, canvas, rotationDegrees, imageDOM);
    drawAxis(canvasContext, canvasRef.current, axisCoordinates, imageDOM);
  }, [axisCoordinates]);

  return (
    <div>
      <div>Align this</div>
      <canvas ref={canvasRef} className="preview-canvas" />
      <div>
        <div>Axis offset Y:{axisCoordinates.y}</div>
        <div>Move Vertical</div>
        <button
          onClick={(e) =>
            incrementOrginCoordinates(e, 0, -1, setAxisCoordinates)
          }
        >
          Move up
        </button>
        <button
          onClick={(e) =>
            incrementOrginCoordinates(e, 0, 1, setAxisCoordinates)
          }
        >
          Move down
        </button>
      </div>

      <div>
        <div>Degrees of rotation: {rotationDegrees}</div>
        <button onClick={(e) => incrementBy(e, setRotationDegrees, -1)}>
          Rotate left
        </button>
        <button onClick={(e) => incrementBy(e, setRotationDegrees, 1)}>
          Rotate right
        </button>
      </div>
    </div>
  );
}

export default ImageAligner;
