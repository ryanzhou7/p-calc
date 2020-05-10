import React, { useState } from "react";
import ImageInput from "./components/ImageInput/ImageInput";
import ImageAligner from "./components/ImageAligner/ImageAligner";
import ImageAnalyzer from "./components/ImageAnalyzer/ImageAnalyzer";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);

  return (
    <div className="App">
      <div>
        <h1>Welcome to G-calc</h1>
        <ImageInput setImage={setImage} />
        <ImageAligner image={image} />
        <ImageAnalyzer image={image} />
      </div>
    </div>
  );
}

export default App;
