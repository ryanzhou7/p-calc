import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import * as innerCanvasInfoReducer from "../../redux/innerCanvasInfoReducer";
import * as outerCanvasInfoReducer from "../../redux/outerCanvasInfoReducer";
import ColorToggler from "../ColorToggler/ColorToggler";
import CanvasEffectButtonGroup from "../CanvasEffectButtonGroup/CanvasEffectButtonGroup";
import "./index.css";

function ImageAnalyzer(props) {
  const dispatch = useDispatch();
  const SLIDER_MIN = 0;
  const SLIDER_MAX = 255;
  const [detectionThreshold, setDetectionThreshold] = useState(0);

  const changeDetectionThresholdBy = (value) => {
    setDetectionThreshold((previous) => {
      previous = parseInt(previous);
      let newValue = previous + value;
      newValue = newValue < 0 ? SLIDER_MIN : newValue;
      newValue = newValue > SLIDER_MAX ? SLIDER_MAX : newValue;
      return newValue;
    });
  };

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
        <Form.Label>Sensitivity: {detectionThreshold}</Form.Label>
        <div className="d-flex mx-auto mb-3 justify-content-center">
          <Form.Control
            className="input mx-2"
            type="range"
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            value={detectionThreshold}
            onChange={(event) => setDetectionThreshold(event.target.value)}
          />
        </div>
        <div className="d-flex mx-auto justify-content-center">
          <Button
            onClick={() => {
              changeDetectionThresholdBy(-15);
            }}
            variant="outline-primary"
          >
            -15
          </Button>
          <Button
            className="mx-2"
            onClick={() => {
              changeDetectionThresholdBy(-5);
            }}
            variant="outline-primary"
          >
            -5
          </Button>
          <Button
            className="mx-2"
            onClick={() => {
              changeDetectionThresholdBy(-1);
            }}
            variant="outline-primary"
          >
            -1
          </Button>

          <Button
            className="mx-2"
            onClick={() => {
              changeDetectionThresholdBy(1);
            }}
            variant="outline-primary"
          >
            +1
          </Button>

          <Button
            className="mx-2"
            onClick={() => {
              changeDetectionThresholdBy(5);
            }}
            variant="outline-primary"
          >
            +5
          </Button>
          <Button
            onClick={() => {
              changeDetectionThresholdBy(15);
            }}
            variant="outline-primary"
          >
            +15
          </Button>
        </div>
      </div>
      <div className="m-2">
        <CanvasEffectButtonGroup {...canvasColorOptionsProps} />
      </div>
    </div>
  );
}

export default ImageAnalyzer;
