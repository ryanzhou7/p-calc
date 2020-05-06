import React, { useRef, useState } from "react";
import { handleInputChange } from "./utils/ImageDom";
import Canvas from "./components/Canvas";
import "./App.css";
import logo from "./logo.svg";
//import trafficLight from "./traffic-light.jpg";

function App() {
  const imageInputRef = useRef(null);
  const [imageSource, setImageSource] = useState(null);

  return (
    <div className="App">
      <div>
        <h1>Welcome to G-calc</h1>
        <h3>Choose an image to analyze</h3>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          id="fileinput"
          onChange={(e) => handleInputChange(e, setImageSource)}
        />
        <Canvas title="Red detection" imgSrc={imageSource} />
      </div>
    </div>
  );
}

export default App;
