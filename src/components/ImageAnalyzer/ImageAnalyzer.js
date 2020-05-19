import React, { useState } from "react";
import { handleColorInputChange } from "../../utils/DOM";
import * as ImageAnalysis from "../../utils/ImageAnalysis";
import { Button, Form } from "react-bootstrap";
import * as Canvas from "../../utils/Canvas";

function ImageAnalyzer(props) {
  const { canvasWidth, canvasHeight } = props.canvasDimensions;
  const [image, setImage] = props.image;
  const [detectionThreshold, setDetectionThreshold] = useState(0);
  const [numPixelsColored, setNumPixelsColored] = useState(0);
  const [canvasContext, setCanvasContext] = props.canvasContext;
  const [detectedPixels, setDetectedPixels] = useState([]);
  const [recolorHex, setRecolorHex] = useState("#0000FF");
  const [targetColorHex, setTargetColorHex] = useState("#FF0000");

  const recolorDetection = async () => {
    const { width: detectionWidth, height: detectionHeight } = image;
    const detectionDimensions = { detectionWidth, detectionHeight };
    const imageData = canvasContext.getImageData(
      0,
      0,
      detectionWidth,
      detectionHeight
    );

    const isColorDetector = ImageAnalysis.isRed(detectionThreshold);

    const [recoloredImageData, detectedPixels] = await ImageAnalysis.detect(
      detectionDimensions,
      imageData,
      isColorDetector,
      recolorHex
    );

    canvasContext.putImageData(
      recoloredImageData,
      0,
      0,
      0,
      0,
      detectionWidth,
      detectionHeight
    );
    setDetectedPixels(detectedPixels);
  };

  const recolorCanvasArea = async () => {
    const [imageData, numPixels] = await ImageAnalysis.colorArea(
      image,
      canvasContext,
      recolorHex,
      detectedPixels
    );
    setNumPixelsColored(numPixels);
    canvasContext.putImageData(
      imageData,
      0,
      0,
      0,
      0,
      canvasWidth,
      canvasHeight
    );
  };

  return (
    <div>
      <div>
        {/* <Form.Label>Target detection Color:</Form.Label>
        <Form.Control
          className="mx-auto"
          style={inputStyle}
          type="color"
          value={targetColorHex}
          onChange={(e) => handleTargetColorChange(e)}
        /> */}

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
        <Button className="mx-1" onClick={(e) => recolorDetection(e)}>
          Recolor detected
        </Button>
        <Button className="mx-1" onClick={(e) => recolorCanvasArea(e)}>
          Color area
        </Button>
        <Button
          className="mx-1"
          onClick={(e) => {
            e.preventDefault();
            Canvas.setWithImage(
              canvasContext,
              canvasWidth,
              canvasHeight,
              image
            );
          }}
        >
          Reset
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
