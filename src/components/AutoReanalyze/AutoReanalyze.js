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

  // Props
  const { webcamRef } = props;

  // Child props
  const canvasProps = {
    ...props,
    canvasContext: [
      combinedCanvasInfo.context,
      combinedCanvasInfoReducer.setContext,
    ],
  };

  async function fullAnalysis() {
    const {
      topPixelsCount: top,
      bottomPixelsCount: bottom,
      context,
    } = await utils.fullAnalysis(imageSource, combinedCanvasInfo);

    // don't have to do this to update ?
    dispatch(combinedCanvasInfoReducer.setContext(context));
    dispatch(combinedCanvasInfoReducer.setNumColoredOuterPixels(top));
    dispatch(combinedCanvasInfoReducer.setNumColoredInnerPixels(bottom));
  }

  return (
    <div>
      <div className="d-flex justify-content-around align-items-center">
        <Canvas {...canvasProps} />

        <div>
          <Button
            className="my-1"
            variant="outline-primary"
            onClick={() => {
              window.scrollTo(0, webcamRef.current.offsetTop);
            }}
          >
            Retake
          </Button>

          <div>
            <div className="my-4">
              <Button className="mr-4" variant="outline-primary">
                -
              </Button>
              <Button variant="outline-primary">+</Button>
            </div>
            <Button
              onClick={() => {
                //fullAnalysis();
                //utils.colorEdges(imageSource, combinedCanvasInfo);
                utils.canny(imageSource, combinedCanvasInfo);
              }}
            >
              Analyze
            </Button>
          </div>
          <div className="mt-4">
            Loss:{" "}
            {utils.calculatedLossPercent(
              outerNumColoredPixels,
              innerNumColoredPixels
            )}
            %
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisResults;
