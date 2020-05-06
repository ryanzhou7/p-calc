import React, { useEffect, useRef, useState } from "react";
import { toPixels } from "../utils/Pixel";
function Canvas(props) {
  const canvasRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const { title } = props;
  const { imgSrc } = props;

  useEffect(() => {
    const { current: canvas } = canvasRef;
    const ctx = canvas.getContext("2d");
    const imageDOM = new Image();

    imageDOM.src = imgSrc;
    imageDOM.onload = () => {
      canvas.width = imageDOM.width;
      canvas.height = imageDOM.height;

      ctx.drawImage(imageDOM, 0, 0, imageDOM.width, imageDOM.height);

      //const imageData = ctx.getImageData(0, 0, imageDOM.width, imageDOM.height);
      const newImageData = toPixels(imageDOM, ctx);

      ctx.putImageData(
        newImageData,
        0,
        0,
        0,
        0,
        imageDOM.width,
        imageDOM.height
      );
    };
  }, [imgSrc]);

  return (
    <div>
      <h4>{title}</h4>
      <canvas ref={canvasRef} />
      <button onClick>Change red </button>
    </div>
  );
}

export default Canvas;
