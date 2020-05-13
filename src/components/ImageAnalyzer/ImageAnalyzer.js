import React, { useState } from "react";
import { handleColorInputChange } from "../../utils/DOM";
import { detect, colorArea } from "../../utils/ImageAnalysis";
import { Button, Form } from "react-bootstrap";

function ImageAnalyzer(props) {
  const { image } = props;
  const { xAxisYPoint } = props;
  const [detectionThreshold, setDetectionThreshold] = useState(0);
  const [numPixelsColored, setNumPixelsColored] = useState(0);
  const [canvasContext, setCanvasContext] = props.canvasContext;
  const [detectedPixels, setDetectedPixels] = useState([]);
  const [recolorHex, setRecolorHex] = useState("#0000FF");
  const [targetColorHex, setTargetColorHex] = useState("#FF0000");

  const handleTargetColorChange = (e) => {
    e.preventDefault();
    const { value: newColor } = e.target;
    setTargetColorHex(newColor);
  };

  const recolorCanvas = () => {
    const [imageData, detectedPixels] = detect(
      image,
      canvasContext,
      detectionThreshold,
      recolorHex,
      targetColorHex
    );
    canvasContext.putImageData(imageData, 0, 0);
    setDetectedPixels(detectedPixels);
  };

  const recolorCanvasArea = () => {
    const [imageData, numPixels] = colorArea(
      image,
      canvasContext,
      recolorHex,
      detectedPixels,
      xAxisYPoint
    );
    setNumPixelsColored(numPixels);
    canvasContext.putImageData(imageData, 0, 0);
  };

  return (
    <div>
      <div>
        <Form.Label>Target detection Color:</Form.Label>
        <Form.Control
          className="mx-auto"
          style={inputStyle}
          type="color"
          value={targetColorHex}
          onChange={(e) => handleTargetColorChange(e)}
        />

        <Form.Label>Recolor:</Form.Label>
        <Form.Control
          className="mx-auto"
          style={inputStyle}
          type="color"
          value={recolorHex}
          onChange={(e) => handleColorInputChange(e, setRecolorHex)}
        />
      </div>
      <div>
        <Form.Label>Sensitivity</Form.Label>
        <Form.Control
          className="mx-auto"
          style={inputStyle}
          type="range"
          min="0"
          max="255"
          value={detectionThreshold}
          onChange={(e) => setDetectionThreshold(e.target.value)}
        />
      </div>
      <div className="m-2">
        <Button className="mx-1" onClick={(e) => recolorCanvas(e)}>
          Analyze
        </Button>
        <Button className="mx-1" onClick={(e) => recolorCanvasArea(e)}>
          Color area
        </Button>
      </div>
      <div>
        <div>Pixel count: {numPixelsColored}</div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "200px",
};

export default ImageAnalyzer;
