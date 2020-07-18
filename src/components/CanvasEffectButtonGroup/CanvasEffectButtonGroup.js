import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import * as innerCanvasInfoReducer from "../../redux/innerCanvasInfoReducer";
import * as outerCanvasInfoReducer from "../../redux/outerCanvasInfoReducer";
import * as ImageAnalysis from "../../utils/ImageAnalysis";
import * as utils from "./utils";

function CanvasEffectButtonGroup(props) {
  const dispatch = useDispatch();

  // Redux
  const image = useSelector((state) => state.image.source);
  const isOuterEdit = useSelector((state) => state.canvasEdit.isOuterEdit);
  const outerCanvasInfo = useSelector((state) => state.outerCanvasInfo);
  const innerCanvasInfo = useSelector((state) => state.innerCanvasInfo);
  const { width: canvasWidth, height: canvasHeight } = useSelector(
    (state) => state.canvasSettings.canvasDimensions
  );

  // Props
  const { recolorHex } = props;

  // local
  const currentCanvasInfo = isOuterEdit ? outerCanvasInfo : innerCanvasInfo;

  async function recolorDetection() {
    let canvasContextInput = currentCanvasInfo.context;

    const { canvasContext, detectedPixels } = await utils.recolorDetection(
      image,
      canvasContextInput,
      recolorHex
    );
    const setContext = isOuterEdit
      ? outerCanvasInfoReducer.setContext
      : innerCanvasInfoReducer.setContext;
    dispatch(setContext(canvasContext));

    const setDetectedPixels = isOuterEdit
      ? outerCanvasInfoReducer.setDetectedPixels
      : innerCanvasInfoReducer.setDetectedPixels;
    dispatch(setDetectedPixels(detectedPixels));
  }

  return (
    <div>
      <Button
        variant="outline-primary"
        className="mx-1"
        onClick={() => recolorDetection()}
      >
        Recolor detected
      </Button>
      <Button
        variant="outline-primary"
        className="mx-1"
        onClick={(event) => {
          const setNumPixelsColored = isOuterEdit
            ? outerCanvasInfoReducer.setNumColoredPixelsCallback(dispatch)
            : innerCanvasInfoReducer.setNumColoredPixelsCallback(dispatch);

          const setDetectedPixels = isOuterEdit
            ? outerCanvasInfoReducer.setDetectedPixels
            : innerCanvasInfoReducer.setDetectedPixels;
          dispatch(setDetectedPixels([]));

          utils.resetCanvas(
            event,
            currentCanvasInfo.context,
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

export default CanvasEffectButtonGroup;
