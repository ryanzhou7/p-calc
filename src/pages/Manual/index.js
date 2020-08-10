import React, { useRef, useCallback, useEffect } from "react";
import { Button } from "react-bootstrap";
import { withOrientationChange } from "react-device-detect";
import ImageAnalyzer from "../../components/ImageAnalyzer/ImageAnalyzer";
import Canvas from "../../components/Canvas/Canvas";
import Webcam from "react-webcam";
import * as imageReducer from "../../redux/imageReducer";
import * as DomHelper from "../../utils/DomHelper";
import { useSelector, useDispatch } from "react-redux";
import { setContext as setInnerContext } from "../../redux/innerCanvasInfoReducer";
import { setContext as setOuterContext } from "../../redux/outerCanvasInfoReducer";
import AnalysisResults from "../../components/AnalysisResults/AnalysisResults";
import "./index.css";
import target from "../../assets/target/thick.png";
import sampleChart from "../../assets/black-red.jpeg";

function Manual(props) {
  // Setup
  const dispatch = useDispatch();

  // State
  const videoConstraints = useSelector(
    (state) => state.videoReducer.videoConstraints
  );
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

  // Remove this later, just for testing
  useEffect(() => {
    dispatch(imageReducer.setImageOnload(sampleChart));
  }, []);

  // Props
  const { isPortrait } = props;

  // Ref
  const webcamRef = useRef(null);
  const captureContainerRef = useRef(null);

  // Other hooks
  const capture = useCallback(() => {
    const screenshot = webcamRef.current.getScreenshot();
    dispatch(imageReducer.setImageOnload(screenshot));
    DomHelper.downloadJpegInClient(screenshot, "image");
  }, [webcamRef]);

  // Children props setup
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
              height={videoConstraints.height}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={videoConstraints.width}
              videoConstraints={videoConstraints}
            />
            <div className="overlay">
              <img
                className="target"
                style={{ height: videoConstraints.height }}
                src={target}
              />
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
