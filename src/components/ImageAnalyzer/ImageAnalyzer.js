import React, { useRef, useState, useEffect } from "react";
import { drawImage, clear } from "../../utils/Canvas";
import { handleColorInputChange } from "../../utils/DOM";
import { toPixels } from "../../utils/ImageAnalysis";

function ImageAnalyzer(props) {
  const [redThreshold, setRedThreshold] = useState(0);
  const [canvasContext, setCanvasContext] = useState(null);
  const [recolorHex, setRecolorHex] = useState("#0000FF");
  const { image } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    clear(canvasContext, canvas);
    drawImage(canvasContext, canvas, image);
  }, [image]);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    const context = canvas.getContext("2d");
    setCanvasContext(context);
  }, []);

  const recolorCanvas = () => {
    const imageData = toPixels(image, canvasContext, redThreshold, recolorHex);
    canvasContext.putImageData(imageData, 0, 0);
  };

  return (
    <div>
      <div>
        <label>More sensitive</label>
        <input
          type="range"
          min="0"
          max="255"
          value={redThreshold}
          onChange={(e) => setRedThreshold(e.target.value)}
        />
        <label>Less sensitive</label>
      </div>
      <div>
        <label> Recolor: </label>
        <input
          type="color"
          value={recolorHex}
          onChange={(e) => handleColorInputChange(e, setRecolorHex)}
        />
        <button onClick={(e) => recolorCanvas(e)}>Analyze</button>
      </div>
      <canvas ref={canvasRef} className="preview-canvas" />
    </div>
  );
}

export default ImageAnalyzer;
