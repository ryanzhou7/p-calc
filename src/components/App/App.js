import React, { useRef, useCallback, useEffect } from "react";
import { Button, Card, Accordion } from "react-bootstrap";
import FileInput from "../FileInput/FileInput";
import ImageAnalyzer from "../ImageAnalyzer/ImageAnalyzer";
import * as utils from "./utils";
import Canvas from "../Canvas/Canvas";
import Webcam from "react-webcam";
import * as imageReducer from "../../redux/imageReducer";
import { useSelector, useDispatch } from "react-redux";
import { setContext as setInnerContext } from "../../redux/innerCanvasInfoReducer";
import { setContext as setOuterContext } from "../../redux/outerCanvasInfoReducer";
import AnalysisResults from "../AnalysisResults/AnalysisResults";

import "./App.css";
import sample from "../../assets/thicc-png.png";

const WIDTH = 450;
const HEIGHT = 370;

// TODO this same as canvas dimensions in canvas settings
const videoConstraints = {
  width: WIDTH,
  height: HEIGHT,
  // facingMode: { exact: "environment" },
  facingMode: "user",
  audio: false,
  imageSmoothing: true,
  screenshotQuality: 1,
};

function App() {
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
  const capture = useCallback(() => {
    const screenshot = webcamRef.current.getScreenshot();
    dispatch(imageReducer.setImage(screenshot));
  }, [webcamRef]);

  return (
    <div className="App">
      <h4>Welcome to P-calc!</h4>

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
          <img src={sample} />
        </div>
      </div>

      {/* <span
            className="cross"
            style={{
              position: "absolute",
              top: HEIGHT / 2 + 2,
              right: 0,
              bottom: HEIGHT / 2 + 2,
              left: 0,
              backgroundColor: "red",
            }}
          ></span>

          <span
            className="circle"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          ></span>

          <span
            style={{
              position: "absolute",
              top: HEIGHT / 2 + 2,
              right: 0,
              bottom: HEIGHT / 2 + 2,
              left: 0,
              backgroundColor: "red",
            }}
          ></span> */}

      <div className="my-3">
        <Button onClick={capture} variant="outline-primary">
          Take picture
        </Button>
      </div>

      <Canvas {...outerCanvasProps} />
      <Canvas {...innerCanvasProps} />
      <ImageAnalyzer />

      <div>
        <AnalysisResults {...analysisResultsProps} />
      </div>
    </div>
  );
}

export default App;
