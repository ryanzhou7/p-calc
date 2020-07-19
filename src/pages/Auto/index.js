import React, { useRef, useCallback, useEffect } from "react";
import { Button } from "react-bootstrap";
import { withOrientationChange } from "react-device-detect";
import Webcam from "react-webcam";
import * as imageReducer from "../../redux/imageReducer";
import { useSelector, useDispatch } from "react-redux";
import AutoReanalyze from "../../components/AutoReanalyze/AutoReanalyze";
import target from "../../assets/target/thick.png";
import "./index.css";
import sampleChart from "../../assets/top-max.jpeg";
//import sampleChart from "../../assets/image-5.jpeg";

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
  const { isPortrait } = props;

  // Ref
  const webcamRef = useRef(null);
  const captureContainerRef = useRef(null);

  // UseEffect - Remove this later, just for testing
  useEffect(() => {
    dispatch(imageReducer.setImage(sampleChart));
  }, []);

  // Other hooks
  const capture = useCallback(() => {
    const screenshot = webcamRef.current.getScreenshot();
    dispatch(imageReducer.setImage(screenshot));
  }, [webcamRef]);

  // Children props setup
  const autoReanalyzeProps = {
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
      <div>
        <AutoReanalyze {...autoReanalyzeProps} />
      </div>
    </div>
  );
}

export default withOrientationChange(Auto);
