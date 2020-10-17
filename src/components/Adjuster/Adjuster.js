import React, { useRef, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as combinedCanvasInfoReducer from "../../redux/combinedCanvasInfoReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Canvas from "../Canvas/Canvas";
import * as utils from "./utils";
import * as DomHelper from "../../utils/DomHelper";

function AnalysisResults(props) {
  const dispatch = useDispatch();

  // State
  const combinedCanvasInfo = useSelector((state) => state.combinedCanvasInfo);
  const imageSource = useSelector((state) => state.image.source);
  const imageForDownload = useSelector((state) => state.image.image);
  const [threshold, setThreshold] = props.thresholdState;

  const outerNumColoredPixels = combinedCanvasInfo.numColoredOuterPixels;
  const innerNumColoredPixels = combinedCanvasInfo.numColoredInnerPixels;

  // Props
  const { webcamContainerRef } = props;
  const [, setIsCameraOn] = props.cameraState;

  // Child props
  const canvasProps = {
    ...props,
    canvasContext: [
      combinedCanvasInfo.context,
      combinedCanvasInfoReducer.setContext,
    ],
  };

  const canvasRef = useRef(null);

  function changeThresholdBy(value) {
    setThreshold((previous) => Math.max(0, previous + value));
  }

  useEffect(() => {
    if (imageSource) {
      fullAnalysis();
    }
  }, [imageSource, threshold]);

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
    <Card>
      {imageSource && <h2 className="card-title">Results</h2>}
      <div>
        <Canvas {...canvasProps} />
        {imageSource && (
          <div
            className={`d-flex justify-content-around align-items-center mb-4`}
          >
            <div>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setIsCameraOn(true);
                  window.scrollTo(0, webcamContainerRef.current.offsetTop);
                }}
              >
                Retake picture
              </Button>

              <div>
                <h3 className="mt-4">
                  Loss:{" "}
                  {utils.calculatedLossPercent(
                    outerNumColoredPixels,
                    innerNumColoredPixels
                  )}
                  %
                </h3>
                <div className="mt-4">
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      const now = new Date();
                      DomHelper.downloadJpegInClient(
                        imageForDownload,
                        now.toDateString()
                      );
                    }}
                  >
                    Download original
                  </Button>{" "}
                </div>
              </div>
            </div>

            <Card>
              <Card.Body>
                <Card.Title>Sensitivity: {threshold}</Card.Title>
                <div className="container">
                  <div className="row justify-content-around mb-3">
                    <Button
                      onClick={(e) => {
                        changeThresholdBy(-1);
                      }}
                    >
                      <FontAwesomeIcon icon="minus" size="1x" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        changeThresholdBy(1);
                      }}
                    >
                      <FontAwesomeIcon icon="plus" size="1x" />
                    </Button>
                  </div>
                  <div className="row justify-content-between">
                    <Button
                      className="mr-1"
                      onClick={(e) => {
                        changeThresholdBy(-3);
                      }}
                    >
                      <FontAwesomeIcon icon="minus" size="1x" />
                      {"  "}
                      <FontAwesomeIcon icon="minus" size="1x" />
                    </Button>
                    <Button
                      onClick={(e) => {
                        changeThresholdBy(3);
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
          </div>
        )}
      </div>

      {/* Used for edge canvas */}
      <canvas style={{ display: "none" }} ref={canvasRef} />
    </Card>
  );
}

export default AnalysisResults;
