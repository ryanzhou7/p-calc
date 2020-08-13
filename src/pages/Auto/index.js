import React, { useRef, useCallback, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { withOrientationChange } from "react-device-detect";
import Webcam from "react-webcam";
import * as imageReducer from "../../redux/imageReducer";
import { useSelector, useDispatch } from "react-redux";
import AutoReanalyze from "../../components/AutoReanalyze/AutoReanalyze";
import target from "../../assets/target/thick-half.png";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import sampleChart from "../../assets/sample/7.jpeg";

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
  const autoAnalyzeContainerRef = useRef(null);

  // UseEffect - Remove this later, just for testing
  useEffect(() => {
    //dispatch(imageReducer.setImageOnload(sampleChart));
  }, []);

  // Other hooks
  const capture = useCallback(() => {
    const screenshot = webcamRef.current.getScreenshot();

    dispatch(imageReducer.setImageOnload(screenshot));
    dispatch(imageReducer.setImage(screenshot));
    window.scrollTo(0, autoAnalyzeContainerRef.current.offsetTop);
  }, [webcamRef]);

  // Children props setup
  const autoReanalyzeProps = {
    webcamRef,
    image: image,
    canvasDimensions: {
      canvasWidth: canvasDimensions.width,
      canvasHeight: canvasDimensions.height,
    },
    drawDimensions: {
      drawWidth: canvasDimensions.width,
      drawHeight: canvasDimensions.height,
    },
    isPortrait,
  };

  return (
    <div className="App">
      <h2>Ptosis calculator</h2>
      {isPortrait && !image && <h3>Please rotate your device</h3>}

      {!isPortrait && (
        <Card>
          <div
            className="d-flex align-items-center mx-auto"
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
            <div className="ml-5 my-3">
              <Button onClick={() => capture()}>
                <FontAwesomeIcon icon="camera" size="3x" />
              </Button>
            </div>
          </div>
        </Card>
      )}
      <div className="mt-4" ref={autoAnalyzeContainerRef}>
        <AutoReanalyze {...autoReanalyzeProps} />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default withOrientationChange(Auto);
