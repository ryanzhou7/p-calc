import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as combinedCanvasInfoReducer from "../../redux/combinedCanvasInfoReducer";
import Canvas from "../Canvas/Canvas";
import * as utils from "./utils";

function AnalysisResults(props) {
  const dispatch = useDispatch();

  // State
  const outerCanvasInfo = useSelector((state) => state.outerCanvasInfo);
  const innerCanvasInfo = useSelector((state) => state.innerCanvasInfo);
  const combinedCanvasInfo = useSelector((state) => state.combinedCanvasInfo);
  const canvasDimensions = useSelector(
    (state) => state.canvasSettings.canvasDimensions
  );
  const imageSource = useSelector((state) => state.image.source);

  const outerNumColoredPixels = combinedCanvasInfo.numColoredOuterPixels;
  const innerNumColoredPixels = combinedCanvasInfo.numColoredInnerPixels;

  // Child props
  const canvasProps = {
    ...props,
    canvasContext: [
      combinedCanvasInfo.context,
      combinedCanvasInfoReducer.setContext,
    ],
  };

  // useEffects
  useEffect(() => {
    if (imageSource) {
      utils.combinedAnalysis(
        outerCanvasInfo,
        innerCanvasInfo,
        combinedCanvasInfo,
        canvasDimensions,
        dispatch
      );
    }
  }, [imageSource]);

  return (
    <div>
      <Canvas {...canvasProps} />
      <Button
        className="my-2"
        variant="outline-primary"
        onClick={() => {
          utils.combinedAnalysis(
            outerCanvasInfo,
            innerCanvasInfo,
            combinedCanvasInfo,
            canvasDimensions,
            dispatch
          );
        }}
      >
        Recolor
      </Button>
      <div>
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

export default AnalysisResults;
