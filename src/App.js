import React, { useState } from "react";
import sampleImage from "./blank-goldmann-visual-field.jpeg";
import ImageInput from "./components/ImageInput/ImageInput";
import ImageAligner from "./components/ImageAligner/ImageAligner";
import "./App.css";

function App() {
  const [imageSource, setImageSource] = useState(sampleImage);

  return (
    <div className="App">
      <div>
        <h1>Welcome to G-calc</h1>
        <ImageInput imageSourceSetter={setImageSource} />
        <ImageAligner imageSource={imageSource} />
      </div>
    </div>
  );
}

export default App;
