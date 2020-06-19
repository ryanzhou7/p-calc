import React from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Canvas from "../Canvas/Canvas";
import * as utils from "./utils";

function AnalysisResults(props) {
  const dispatch = useDispatch();
  const outerCanvasInfo = useSelector((state) => state.outerCanvasInfo);
  const innerCanvasInfo = useSelector((state) => state.innerCanvasInfo);
  const combinedCanvasInfo = useSelector((state) => state.combinedCanvasInfo);
  const canvasDimensions = useSelector(
    (state) => state.canvasSettings.canvasDimensions
  );
  const outerNumColoredPixels = outerCanvasInfo.numColoredPixels;
  const innerNumColoredPixels = innerCanvasInfo.numColoredPixels;

  return (
    <div>
      <Canvas {...props.canvas} />
      <Button
        className="my-2"
        variant="outline-primary"
        onClick={() =>
          utils.combinedAnalysis(
            outerCanvasInfo,
            innerCanvasInfo,
            combinedCanvasInfo,
            canvasDimensions,
            dispatch
          )
        }
      >
        Recolor
      </Button>
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

export default AnalysisResults;
