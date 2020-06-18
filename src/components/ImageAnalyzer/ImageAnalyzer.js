import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import * as DomHelper from "../../utils/DomHelper";
import * as utils from "./utils";
import ColorToggler from "../ColorToggler/ColorToggler";
import CanvasEffectButtonGroup from "../CanvasEffectButtonGroup/CanvasEffectButtonGroup";
import "./index.css";

function ImageAnalyzer(props) {
  const sliderMin = 0;
  const sliderMax = 255;

  const outerCanvasInfo = useSelector((state) => state.outerCanvasInfo);
  const innerCanvasInfo = useSelector((state) => state.innerCanvasInfo);
  const outerNumColoredPixels = outerCanvasInfo.numColoredPixels;
  const innerNumColoredPixels = innerCanvasInfo.numColoredPixels;

  const [detectionThreshold, setDetectionThreshold] = useState(0);
  const [recolorHex, setRecolorHex] = useState("#00FF00");

  const canvasColorOptionsProps = {
    detectionThreshold: [detectionThreshold, setDetectionThreshold],
    recolorHex: recolorHex,
    ...props,
  };

  return (
    <div>
      <div>
        <ColorToggler />
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
        <div>Outer pixel count: {outerNumColoredPixels}</div>
        <div>Inner pixel count: {innerNumColoredPixels}</div>
        <div>
          Calculated Loss %:{" "}
          {utils.calculatedLossPercent(
            outerNumColoredPixels,
            innerNumColoredPixels
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageAnalyzer;
