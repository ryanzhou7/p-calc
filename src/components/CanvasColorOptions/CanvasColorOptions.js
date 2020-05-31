import React, { useState } from "react";
import { Button } from "react-bootstrap";
import * as ImageAnalysis from "../../utils/ImageAnalysis";
import * as utils from "./utils";

function CanvasColorOptions(props) {
  const [detectedPixels, setDetectedPixels] = useState([]);
  const { recolorHex } = props;
  const [isRedEdit] = props.isRedEdit;

  const [canvasContext] = props.canvasContext;
  const [detectionThreshold] = props.detectionThreshold;
  const [, setNumPixelsColoredRed] = props.numPixelsColoredRed;
  const [, setNumPixelsColoredBlue] = props.numPixelsColoredBlue;

  const [image] = props.image;
  const { canvasWidth, canvasHeight } = props.canvasDimensions;

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
          utils.resetCanvas(
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
  );
}

export default CanvasColorOptions;
