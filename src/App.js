import React, { useRef, useState } from "react";
import { handleInputChange } from "./utils/ImageDom";
import Canvas from "./components/Canvas/Canvas";
import sample from "./red-flat-line.png";
import "./App.css";

function App() {
  const imageInputRef = useRef(null);
  const [imageSource, setImageSource] = useState(sample);
  const [redThreshold, setRedThreshold] = useState(0);

  return (
    <div className="App">
      <div>
        <h1>Welcome to G-calc</h1>
        <h3>Choose an image to analyze</h3>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleInputChange(e, setImageSource)}
        />

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
    </div>
  );
}

export default App;
