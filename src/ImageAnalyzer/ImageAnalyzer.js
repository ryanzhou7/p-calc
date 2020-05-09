import React, { useRef, useState } from "react";
import Canvas from "../components/Canvas/Canvas";

function ImageAnalyzer() {
  const [redThreshold, setRedThreshold] = useState(0);

  return (
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
      <Canvas
        title="Red detection"
        imgSrc={imageSource}
        redThreshold={redThreshold}
      />
    </div>
  );
}

export default ImageAnalyzer;
