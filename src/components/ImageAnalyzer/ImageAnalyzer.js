import React, { useState } from "react";
import { Form } from "react-bootstrap";
import * as DomHelper from "../../utils/DomHelper";
import ColorToggler from "../ColorToggler/ColorToggler";
import ImageAligner from "../ImageAligner/ImageAligner";
import CanvasEffectButtonGroup from "../../components/CanvasColorOptions/CanvasColorOptions";
import "./index.css";

function ImageAnalyzer(props) {
  const sliderMin = 0;
  const sliderMax = 255;
  const [detectionThreshold, setDetectionThreshold] = useState(0);
  const [numPixelsColoredRed, setNumPixelsColoredRed] = useState(0);
  const [numPixelsColoredBlue, setNumPixelsColoredBlue] = useState(0);
  const [recolorHex, setRecolorHex] = useState("#00FF00");

  const canvasColorOptionsProps = {
    numPixelsColoredRed: [numPixelsColoredRed, setNumPixelsColoredRed],
    detectionThreshold: [detectionThreshold, setDetectionThreshold],
    numPixelsColoredBlue: [numPixelsColoredBlue, setNumPixelsColoredBlue],
    recolorHex: recolorHex,
    ...props,
  };

  const imageAlignerProps = {
    rotationDegrees: props.rotationDegrees,
    axisCoordinates: props.axisCoordinates,
  };

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
        <Form.Label>Sensitivity:{detectionThreshold}</Form.Label>
        <Form.Control
          className="mx-auto input"
          type="range"
          min={sliderMin}
          max={sliderMax}
          value={detectionThreshold}
          onChange={(event) => setDetectionThreshold(event.target.value)}
        />
      </div>
      <div className="m-2">
        <CanvasEffectButtonGroup {...canvasColorOptionsProps} />
      </div>

      <div className="m-2">
        <ImageAligner {...imageAlignerProps} />
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
