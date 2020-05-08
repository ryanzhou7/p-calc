import React, { useEffect, useRef, useState } from "react";
import { toPixels } from "../../utils/Pixel";
import "./Canvas.css";

function Canvas(props) {
  const canvasRef = useRef(null);
  const [reColor, setReColor] = useState("#ffff00");
  const [horizontalLineYPosition, setHorizontalLineYPosition] = useState(0);

  const { title } = props;
  const { redThreshold } = props;
  const { imgSrc } = props;

  const handleYChange = (e, change) => {
    e.preventDefault();
    setHorizontalLineYPosition((y) => y + change);
  };

  useEffect(() => {
    const { current: canvas } = canvasRef;
    const ctx = canvas.getContext("2d");
    const imageDOM = new Image();

    imageDOM.src = imgSrc;
    imageDOM.onload = () => {
      canvas.width = imageDOM.width;
      canvas.height = imageDOM.height;

      ctx.drawImage(imageDOM, 0, 0, imageDOM.width, imageDOM.height);
      const newImageData = toPixels(imageDOM, ctx, redThreshold, reColor);
      ctx.putImageData(
        newImageData,
        0,
        0,
        0,
        0,
        imageDOM.width,
        imageDOM.height
      );

      ctx.beginPath();
      ctx.moveTo(0, 300 + horizontalLineYPosition);
      ctx.lineTo(800, 300 + horizontalLineYPosition);
      ctx.stroke();
    };
  }, [imgSrc, redThreshold, horizontalLineYPosition]);

  return (
    <div>
      <h4>{title}</h4>
      <canvas ref={canvasRef} className="preview-canvas" />
      <div>
        <label>Recoloring for red detection</label>
        <input
          type="color"
          value={reColor}
          onChange={(event) => {
            setReColor(event.target.value);
          }}
        />
      </div>
      <div>
        <button onClick={(e) => handleYChange(e, -1)}>Move up</button>
        <button onClick={(e) => handleYChange(e, 1)}>Move down</button>
      </div>
    </div>
  );
}

export default Canvas;
