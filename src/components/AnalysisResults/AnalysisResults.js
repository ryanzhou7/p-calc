import React from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as combinedCanvasInfoReducer from "../../redux/combinedCanvasInfoReducer";
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
  const imageSource = useSelector((state) => state.image.source);

  const outerNumColoredPixels = combinedCanvasInfo.numColoredOuterPixels;
  const innerNumColoredPixels = combinedCanvasInfo.numColoredInnerPixels;

  const canvasProps = {
    ...props,
    canvasContext: [
      combinedCanvasInfo.context,
      combinedCanvasInfoReducer.setContext,
    ],
  };

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

      <Button
        className="my-2 ml-2"
        variant="outline-primary"
        onClick={() => {
          const contexts = [
            outerCanvasInfo.context,
            innerCanvasInfo.context,
            combinedCanvasInfo.context,
          ];

          utils.downloadAll(contexts, imageSource);
        }}
      >
        Download all
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
