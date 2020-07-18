import React from "react";
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

  async function fullAnalysis() {
    const combinedCanvasContext = await utils.fullAnalysis(
      imageSource,
      combinedCanvasInfo
    );
    // don't have to do this to update
    //dispatch(combinedCanvasInfoReducer.setContext(combinedCanvasContext));
  }

  return (
    <div>
      <div className="d-flex justify-content-around align-items-center">
        <Canvas {...canvasProps} />

        <div>
          <Button
            className="my-2"
            variant="outline-primary"
            onClick={fullAnalysis}
          >
            Full analysis
          </Button>

          <div>
            Calculated Loss %:{" "}
            {utils.calculatedLossPercent(
              outerNumColoredPixels,
              innerNumColoredPixels
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisResults;
