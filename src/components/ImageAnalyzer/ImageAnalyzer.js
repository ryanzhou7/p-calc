import React, { useState } from "react";
import { Form } from "react-bootstrap";
import * as DomHelper from "../../utils/DomHelper";
import * as utils from "./utils";
import ColorToggler from "../ColorToggler/ColorToggler";
import CanvasEffectButtonGroup from "../CanvasEffectButtonGroup/CanvasEffectButtonGroup";
import "./index.css";
import { useSelector } from "react-redux";

function ImageAnalyzer(props) {
  const sliderMin = 0;
  const sliderMax = 255;

  const isRedEdit = useSelector((state) => state.canvasEdit.isRedEdit);

  const [
    numPixelsColoredRed,
    setNumPixelsColoredRed,
  ] = props.numPixelsColoredRed;
  const [
    numPixelsColoredBlue,
    setNumPixelsColoredBlue,
  ] = props.numPixelsColoredBlue;

  const [detectionThreshold, setDetectionThreshold] = useState(0);
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
        <ColorToggler isRedEdit={isRedEdit} />
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

      <h5>Results: </h5>
      <div>
        <div>Red pixel count: {numPixelsColoredRed}</div>
        <div>Blue pixel count: {numPixelsColoredBlue}</div>
        <div>
          Calculated Loss %:{" "}
          {utils.calculatedLossPercent(
            numPixelsColoredRed,
            numPixelsColoredBlue
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageAnalyzer;
