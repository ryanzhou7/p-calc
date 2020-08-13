import React, { useState, useRef, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as combinedCanvasInfoReducer from "../../redux/combinedCanvasInfoReducer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Canvas from "../Canvas/Canvas";
import * as utils from "./utils";

function AnalysisResults(props) {
  const dispatch = useDispatch();

  // State
  const combinedCanvasInfo = useSelector((state) => state.combinedCanvasInfo);
  const imageSource = useSelector((state) => state.image.source);
  const [threshold, setThreshold] = useState(20);

  const outerNumColoredPixels = combinedCanvasInfo.numColoredOuterPixels;
  const innerNumColoredPixels = combinedCanvasInfo.numColoredInnerPixels;

  // Props
  const { webcamRef, isPortrait } = props;
  const analyisLayoutClass = isPortrait ? "flex-column" : "";

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
      <div
        className={`d-flex justify-content-around align-items-center ${analyisLayoutClass}`}
      >
        <Canvas {...canvasProps} />

        <div className="mt-3">
          {imageSource && (
            <div>
              {!isPortrait && (
                <Button
                  className="my-4"
                  variant="outline-primary"
                  onClick={() => {
                    window.scrollTo(0, webcamRef.current.offsetTop);
                  }}
                >
                  Retake picture
                </Button>
              )}

              <div>
                <Card>
                  <Card.Body>
                    <Card.Title>Detect</Card.Title>

                    <div className="container">
                      <div className="row justify-content-around mb-3">
                        <Button
                          onClick={() => {
                            changeThresholdBy(-2);
                            fullAnalysis();
                          }}
                        >
                          <FontAwesomeIcon icon="minus" size="1x" />
                        </Button>
                        <Button
                          onClick={() => {
                            changeThresholdBy(2);
                            fullAnalysis();
                          }}
                        >
                          <FontAwesomeIcon icon="plus" size="1x" />
                        </Button>
                      </div>
                      <div className="row justify-content-around">
                        <Button
                          onClick={() => {
                            changeThresholdBy(-5);
                            fullAnalysis();
                          }}
                        >
                          <FontAwesomeIcon icon="minus" size="1x" />
                          {"  "}
                          <FontAwesomeIcon icon="minus" size="1x" />
                        </Button>
                        <Button
                          onClick={() => {
                            changeThresholdBy(5);
                            fullAnalysis();
                          }}
                        >
                          <FontAwesomeIcon icon="plus" size="1x" />
                          {"  "}
                          <FontAwesomeIcon icon="plus" size="1x" />
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                <div className="my-4"></div>
              </div>
            </div>
          )}

          {imageSource && (
            <h3 className="mt-4">
              Loss:{" "}
              {utils.calculatedLossPercent(
                outerNumColoredPixels,
                innerNumColoredPixels
              )}
              %
            </h3>
          )}
        </div>
        {isPortrait && imageSource && (
          <label>Rotate your device to retake picture</label>
        )}
      </div>

      {/* Used for edge canvas */}
      <canvas style={{ display: "none" }} ref={canvasRef} />
    </div>
  );
}

export default AnalysisResults;
