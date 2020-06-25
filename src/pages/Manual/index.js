import React, { useRef, useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { withOrientationChange } from "react-device-detect";
import ImageAnalyzer from "../../components/ImageAnalyzer/ImageAnalyzer";
import Canvas from "../../components/Canvas/Canvas";
import Webcam from "react-webcam";
import * as imageReducer from "../../redux/imageReducer";
import { useSelector, useDispatch } from "react-redux";
import { setContext as setInnerContext } from "../../redux/innerCanvasInfoReducer";
import { setContext as setOuterContext } from "../../redux/outerCanvasInfoReducer";
import AnalysisResults from "../../components/AnalysisResults/AnalysisResults";
import "./Manual.css";
import sample from "../../assets/target-thick.png";

let WIDTH = 450;
let HEIGHT = 320;

// TODO this same as canvas dimensions in canvas settings
const videoConstraints = {
  width: WIDTH,
  height: HEIGHT,
  //facingMode: { exact: "environment" },
  facingMode: "user",
  audio: false,
  imageSmoothing: true,
  screenshotQuality: 1,
};

function Manual(props) {
  const { isLandscape, isPortrait } = props;
  const dispatch = useDispatch();
  const image = useSelector((state) => state.image.source);

  const innerCanvasContext = useSelector(
    (state) => state.innerCanvasInfo.context
  );
  const outerCanvasContext = useSelector(
    (state) => state.outerCanvasInfo.context
  );
  const canvasDimensions = useSelector(
    (state) => state.canvasSettings.canvasDimensions
  );

  const outerCanvasProps = {
    image: image,
    canvasDimensions: {
      canvasWidth: canvasDimensions.width,
      canvasHeight: canvasDimensions.height,
    },
    drawDimensions: {
      drawWidth: canvasDimensions.width,
      drawHeight: canvasDimensions.height,
    },
    canvasContext: [outerCanvasContext, setOuterContext],
  };

  const innerCanvasProps = {
    ...outerCanvasProps,
    canvasContext: [innerCanvasContext, setInnerContext],
  };

  const analysisResultsProps = {
    ...innerCanvasProps,
  };

  const webcamRef = useRef(null);
  const captureContainerRef = useRef(null);

  const capture = useCallback(() => {
    const screenshot = webcamRef.current.getScreenshot();
    dispatch(imageReducer.setImage(screenshot));
  }, [webcamRef]);

  return (
    <div className="App">
      {isPortrait && <h5>Please rotate your device</h5>}

      {!isPortrait && (
        <div
          className="d-flex justify-content-around align-items-center"
          ref={captureContainerRef}
        >
          <div style={{ position: "relative", float: "top" }}>
            <Webcam
              audio={false}
              height={HEIGHT}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={WIDTH}
              videoConstraints={videoConstraints}
            />
            <div className="overlay">
              <img style={{ height: HEIGHT }} src={sample} />
            </div>
          </div>
          <div className="my-3">
            <Button onClick={() => capture()} variant="outline-primary">
              Take picture
            </Button>
          </div>
        </div>
      )}

      <Canvas {...outerCanvasProps} />
      <Canvas {...innerCanvasProps} />
      <ImageAnalyzer />

      <div>
        <AnalysisResults {...analysisResultsProps} />
      </div>
    </div>
  );
}

export default withOrientationChange(Manual);
