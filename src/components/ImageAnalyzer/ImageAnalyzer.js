import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import * as DomHelper from "../../utils/DomHelper";
import * as ImageAnalysis from "../../utils/ImageAnalysis";
import ColorToggler from "../ColorToggler/ColorToggler";
import resetCanvas from "./resetCanvas"; // TODO: Review this kind of refactoring/abstraction with Ryan
import "./index.css";

function ImageAnalyzer(props) {
  const [isRedEdit] = props.isRedEdit;
  const { canvasWidth, canvasHeight } = props.canvasDimensions;
  const [image] = props.image;
  const [detectionThreshold, setDetectionThreshold] = useState(0);
  const [numPixelsColoredRed, setNumPixelsColoredRed] = useState(0);
  const [numPixelsColoredBlue, setNumPixelsColoredBlue] = useState(0);
  const [canvasContext] = props.canvasContext;
  const [detectedPixels, setDetectedPixels] = useState([]);
  const [recolorHex, setRecolorHex] = useState("#00FF00");

  async function recolorDetection() {
    const { width: detectionWidth, height: detectionHeight } = image;
    const detectionDimensions = { detectionWidth, detectionHeight };
    const imageData = canvasContext.getImageData(
      0,
      0,
      detectionWidth,
      detectionHeight
    );

    const isColorDetector = isRedEdit
      ? ImageAnalysis.isRed(detectionThreshold)
      : ImageAnalysis.isBlue(detectionThreshold);

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
    const setNumPixelsColored = isRedEdit
      ? setNumPixelsColoredRed
      : setNumPixelsColoredBlue;
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

  return (
    <div>
      <div>
        <ColorToggler isRedEdit={props.isRedEdit} />
      </div>
      <div>
        <Form.Label>Recolor:</Form.Label>
        <Form.Control
          className="mx-auto input"
          type="color"
          value={recolorHex}
          onChange={(event) => DomHelper.setFromInput(event, setRecolorHex)}
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
          onChange={(event) => setDetectionThreshold(event.target.value)}
        />
      </div>
      <div className="m-2">
        <Button
          variant="outline-primary"
          className="mx-1"
          onClick={(event) => recolorDetection(event)}
        >
          Recolor detected
        </Button>
        <Button
          variant="outline-primary"
          className="mx-1"
          onClick={(event) => recolorCanvasArea(event)}
        >
          Color area
        </Button>
        <Button
          variant="outline-primary"
          className="mx-1"
          onClick={(event) => {
            const setNumPixelsColored = isRedEdit
              ? setNumPixelsColoredRed
              : setNumPixelsColoredBlue;
            resetCanvas(
              event,
              canvasContext,
              canvasWidth,
              canvasHeight,
              image,
              setNumPixelsColored
            );
          }}
        >
          Reset
        </Button>
      </div>
      <div>
        <div>Red pixel count: {numPixelsColoredRed}</div>
        <div>Blue pixel count: {numPixelsColoredBlue}</div>
        <div>
          Red / Blue ratio: {numPixelsColoredBlue / numPixelsColoredRed}
        </div>
      </div>
    </div>
  );
}

export default ImageAnalyzer;
