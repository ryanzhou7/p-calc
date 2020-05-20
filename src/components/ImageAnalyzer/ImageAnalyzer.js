import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import * as DomHelper from "../../utils/DomHelper";
import * as ImageAnalysis from "../../utils/ImageAnalysis";
import * as Canvas from "../../utils/Canvas";
import "./index.css";

function ImageAnalyzer(props) {
  const { canvasWidth, canvasHeight } = props.canvasDimensions;
  const [image] = props.image;
  const [detectionThreshold, setDetectionThreshold] = useState(150);
  const [numPixelsColored, setNumPixelsColored] = useState(0);
  const [canvasContext] = props.canvasContext;
  const [detectedPixels, setDetectedPixels] = useState([]);
  const [recolorHex, setRecolorHex] = useState("#0000FF");

  async function recolorDetection() {
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
  }

  async function recolorCanvasArea() {
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
  }

  async function reset(event) {
    event.preventDefault();
    Canvas.setWithImage(canvasContext, canvasWidth, canvasHeight, image);
    setNumPixelsColored(0);
  }

  return (
    <div>
      <div>
        <Form.Label>Recolor:</Form.Label>
        <Form.Control
          className="mx-auto input"
          type="color"
          value={recolorHex}
          onChange={(e) => DomHelper.setFromInput(e, setRecolorHex)}
        />
      </div>
      <div>
        <Form.Label>Sensitivity: {detectionThreshold}</Form.Label>
        <Form.Control
          className="mx-auto input"
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
        <Button className="mx-1" onClick={(event) => reset(event)}>
          Reset
        </Button>
      </div>
      <div>
        <div>Pixel count: {numPixelsColored}</div>
      </div>
    </div>
  );
}

export default ImageAnalyzer;
