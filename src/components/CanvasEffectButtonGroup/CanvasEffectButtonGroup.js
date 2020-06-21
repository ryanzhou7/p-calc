import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import * as innerCanvasInfoReducer from "../../redux/innerCanvasInfoReducer";
import * as outerCanvasInfoReducer from "../../redux/outerCanvasInfoReducer";
import * as ImageAnalysis from "../../utils/ImageAnalysis";
import * as utils from "./utils";

function CanvasEffectButtonGroup(props) {
  const dispatch = useDispatch();
  const image = useSelector((state) => state.image.source);
  const isOuterEdit = useSelector((state) => state.canvasEdit.isOuterEdit);
  const outerCanvasInfo = useSelector((state) => state.outerCanvasInfo);
  const innerCanvasInfo = useSelector((state) => state.innerCanvasInfo);
  const currentCanvasInfo = isOuterEdit ? outerCanvasInfo : innerCanvasInfo;

  const { recolorHex } = props;
  const [detectionThreshold] = props.detectionThreshold;
  const { width: canvasWidth, height: canvasHeight } = useSelector(
    (state) => state.canvasSettings.canvasDimensions
  );

  // TODO move this to utils
  async function recolorDetection(event, canvasContext) {
    event.preventDefault();
    const { width: detectionWidth, height: detectionHeight } = image;
    const detectionDimensions = { detectionWidth, detectionHeight };

    const isColorDetector = isOuterEdit
      ? ImageAnalysis.isRed(detectionThreshold)
      : ImageAnalysis.isBlue(detectionThreshold);

    const [recoloredImageData, detectedPixels] = await ImageAnalysis.detect(
      canvasContext,
      detectionDimensions,
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
        onClick={(event) => recolorDetection(event, currentCanvasInfo.context)}
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
