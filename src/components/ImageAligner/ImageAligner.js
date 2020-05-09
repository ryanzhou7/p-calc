import React, { useRef, useState, useEffect } from "react";
import "./index.css";
import { drawRotated, drawAxis } from "../../utils/Canvas";
import { incrementBy, incrementOrginCoordinates } from "./utils";

function ImageAligner(props) {
  const { imageSource } = props;
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [axisCoordinates, setAxisCoordinates] = useState({ x: 0, y: 0 });
  const [imageDOM, setImageDOM] = useState(null);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    const ctx = canvas.getContext("2d");
    setContext(ctx);
    const image = new Image();
    image.src = imageSource;
    image.onload = () => {
      const { width, height } = image;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(image, 0, 0, width, height);
      setImageDOM(image);
    };
  }, []);

  useEffect(() => {
    drawRotated(context, canvasRef.current, rotationDegrees, imageDOM);
  }, [rotationDegrees]);

  useEffect(() => {
    drawAxis(context, canvasRef.current, axisCoordinates, imageDOM);
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
