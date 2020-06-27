import React, { useRef, useCallback } from "react";
import { Button } from "react-bootstrap";
import { withOrientationChange } from "react-device-detect";
import Webcam from "react-webcam";
import * as imageReducer from "../../redux/imageReducer";
import { useSelector, useDispatch } from "react-redux";
import AnalysisResults from "../../components/AnalysisResults/AnalysisResults";
import sample from "../../assets/target-thick.png";

function Auto(props) {
  // Setup
  const dispatch = useDispatch();

  // Redux
  const videoConstraints = useSelector(
    (state) => state.videoReducer.videoConstraints
  );
  const image = useSelector((state) => state.image.source);
  const canvasDimensions = useSelector(
    (state) => state.canvasSettings.canvasDimensions
  );

  // Props
  const { isLandscape, isPortrait } = props;

  // Ref
  const webcamRef = useRef(null);
  const captureContainerRef = useRef(null);

  // Other hooks
  const capture = useCallback(() => {
    const screenshot = webcamRef.current.getScreenshot();
    dispatch(imageReducer.setImage(screenshot));
  }, [webcamRef]);

  // Children props setup
  const analysisResultsProps = {
    image: image,
    canvasDimensions: {
      canvasWidth: canvasDimensions.width,
      canvasHeight: canvasDimensions.height,
    },
    drawDimensions: {
      drawWidth: canvasDimensions.width,
      drawHeight: canvasDimensions.height,
    },
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
              width={videoConstraints.height}
              videoConstraints={videoConstraints}
            />
            <div className="overlay">
              <img style={{ height: videoConstraints.height }} src={sample} />
            </div>
          </div>
          <div className="my-3">
            <Button onClick={() => capture()} variant="outline-primary">
              Take pictures
            </Button>
          </div>
        </div>
      )}
      <div>
        <AnalysisResults {...analysisResultsProps} />
      </div>
    </div>
  );
}

export default withOrientationChange(Auto);
