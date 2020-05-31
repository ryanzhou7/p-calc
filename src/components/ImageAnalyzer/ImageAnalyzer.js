import React, { useState } from "react";
import { Form } from "react-bootstrap";
import * as DomHelper from "../../utils/DomHelper";
import ColorToggler from "../ColorToggler/ColorToggler";
import CanvasColorOptions from "../../components/CanvasColorOptions/CanvasColorOptions";
import "./index.css";

function ImageAnalyzer(props) {
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
        <CanvasColorOptions {...canvasColorOptionsProps} />
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
