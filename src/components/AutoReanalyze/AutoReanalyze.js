import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as combinedCanvasInfoReducer from "../../redux/combinedCanvasInfoReducer";
import Canvas from "../Canvas/Canvas";
import * as utils from "./utils";
import * as DomHelper from "../../utils/DomHelper";

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
  const image = useSelector((state) => state.image.image);
  const [threshold, setThreshold] = useState(20);

  const outerNumColoredPixels = combinedCanvasInfo.numColoredOuterPixels;
  const innerNumColoredPixels = combinedCanvasInfo.numColoredInnerPixels;

  // Props
  const { webcamRef, isPortrait } = props;

  // Child props
  const canvasProps = {
    ...props,
    canvasContext: [
      combinedCanvasInfo.context,
      combinedCanvasInfoReducer.setContext,
    ],
  };

  const canvasRef = useRef(null);

  const changeThresholdBy = (value) => {
    let change = Math.max(0, threshold + value);
    setThreshold(change);
  };

  useEffect(() => {
    if (imageSource) {
      fullAnalysis();
    }
  }, [imageSource]);

  async function fullAnalysis() {
    // Draw canny
    //utils.getEdgeCanvasHelper(imageSource, combinedCanvasInfo.context);
    const { topPixelsCount, bottomPixelsCount } = await utils.fullAnalysis(
      imageSource,
      combinedCanvasInfo,
      canvasRef,
      threshold
    );
    dispatch(
      combinedCanvasInfoReducer.setNumColoredOuterPixels(topPixelsCount)
    );
    dispatch(
      combinedCanvasInfoReducer.setNumColoredInnerPixels(bottomPixelsCount)
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-around align-items-center">
        <Canvas {...canvasProps} />

        <canvas style={{ display: "none" }} ref={canvasRef} />

        <div>
          {!isPortrait && (
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
                  <Button
                    className="mr-2"
                    onClick={() => {
                      changeThresholdBy(-5);
                      fullAnalysis();
                    }}
                  >
                    Detect less
                  </Button>
                  <Button
                    onClick={() => {
                      changeThresholdBy(5);
                      fullAnalysis();
                    }}
                  >
                    Detect more
                  </Button>
                </div>

                <Button
                  variant="outline-primary"
                  onClick={() => {
                    DomHelper.downloadJpegInClient(image, "close");
                  }}
                >
                  Download
                </Button>
              </div>
            </div>
          )}
          <h3 className="mt-4">
            Loss:{" "}
            {utils.calculatedLossPercent(
              outerNumColoredPixels,
              innerNumColoredPixels
            )}
            %
          </h3>
        </div>
      </div>
    </div>
  );
}

export default AnalysisResults;
