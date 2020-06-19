import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import * as innerCanvasInfoReducer from "../../redux/innerCanvasInfoReducer";
import * as outerCanvasInfoReducer from "../../redux/outerCanvasInfoReducer";
import ColorToggler from "../ColorToggler/ColorToggler";
import CanvasEffectButtonGroup from "../CanvasEffectButtonGroup/CanvasEffectButtonGroup";
import "./index.css";

function ImageAnalyzer(props) {
  const dispatch = useDispatch();
  const sliderMin = 0;
  const sliderMax = 255;
  const [detectionThreshold, setDetectionThreshold] = useState(0);

  const isOuterEdit = useSelector((state) => state.canvasEdit.isOuterEdit);

  const innerSetRecolorHex = innerCanvasInfoReducer.setRecolorHex;
  const outerSetRecolorHex = outerCanvasInfoReducer.setRecolorHex;
  const setRecolorHex = isOuterEdit ? outerSetRecolorHex : innerSetRecolorHex;

  const innerRecolorHex = useSelector(
    (state) => state.innerCanvasInfo.recolorHex
  );

  const outerRecolorHex = useSelector(
    (state) => state.outerCanvasInfo.recolorHex
  );
  const recolorHex = isOuterEdit ? outerRecolorHex : innerRecolorHex;

  const canvasColorOptionsProps = {
    detectionThreshold: [detectionThreshold, setDetectionThreshold],
    ...props,
    recolorHex,
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
          onChange={(event) => {
            const { value } = event.target;
            dispatch(setRecolorHex(value));
          }}
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
    </div>
  );
}

export default ImageAnalyzer;
