import React, { useRef, useEffect, useState } from "react";
import { Button, Card, OverlayTrigger, Popover } from "react-bootstrap";
import { withOrientationChange } from "react-device-detect";
import Webcam from "react-webcam";
import * as imageReducer from "../../redux/imageReducer";
import { useSelector, useDispatch } from "react-redux";
import Adjuster from "../Adjuster/Adjuster";
import target from "../../assets/target/circle.png";
import sample from "../../assets/sample/63.jpg";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// For the analysis
const START_THRESHOLD = 20;

function Auto(props) {
  // Setup
  const dispatch = useDispatch();
  const [threshold, setThreshold] = useState(START_THRESHOLD);
  const [isCameraOn, setIsCameraOn] = useState(true);

  // Redux
  const videoConstraints = useSelector(
    (state) => state.videoReducer.videoConstraints
  );
  const image = useSelector((state) => state.image.source);
  const canvasDimensions = useSelector(
    (state) => state.canvasSettings.canvasDimensions
  );
  const combinedCanvasInfo = useSelector((state) => state.combinedCanvasInfo);

  // Props
  const { isPortrait } = props;

  // Ref
  const webcamContainerRef = useRef(null);
  const webcamRef = useRef(null);
  const autoAnalyzeContainerRef = useRef(null);

  // Set a default image for debugging bad images
  useEffect(() => {
    //dispatch(imageReducer.setImageOnload(sample));
  }, []);

  const capture = () => {
    if (!isCameraOn) {
      setIsCameraOn(true);
      return;
    }

    const screenshot = webcamRef.current.getScreenshot();
    dispatch(imageReducer.setImageOnload(screenshot));
    dispatch(imageReducer.setImage(screenshot));
    window.scrollTo(0, autoAnalyzeContainerRef.current.offsetTop);

    setIsCameraOn(false);
  };

  // Children props setup
  const autoReanalyzeProps = {
    webcamRef,
    webcamContainerRef,
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
    thresholdState: [threshold, setThreshold],
    cameraState: [isCameraOn, setIsCameraOn],
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Content>
        Draw your chart with red sharpie. Align the red target's circle
        concentrically with the chart's smallest circle that still encompasses
        all of the the drawn lines for increased accuracy. Also ensure the
        target cross is aligned with the chart. Camera focus will happen
        automatically. Tap the (?) again to close this popover.
      </Popover.Content>
    </Popover>
  );
  return (
    <div className="App mt-2">
      <h2 className="card-title" style={{ display: "inline" }}>
        Capture chart{" "}
      </h2>
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
        <FontAwesomeIcon icon="question-circle" size="2x" />
      </OverlayTrigger>
      <Card className="mt-4">
        <div className="mx-auto">
          <div className="capture-container mx-auto" ref={webcamContainerRef}>
            {isCameraOn && (
              <>
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  height={videoConstraints.height}
                  screenshotFormat="image/jpeg"
                  width={videoConstraints.width}
                  videoConstraints={videoConstraints}
                />
                <div className="overlay">
                  <img
                    className="target"
                    //width -20 leaves some padding on the left and right side
                    style={{ width: videoConstraints.width - 20 }}
                    src={target}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="my-2 z-top mx-auto">
          <Button className="capture-button" onClick={() => capture()}>
            <FontAwesomeIcon icon="camera" size="3x" />
          </Button>
        </div>
      </Card>

      <div className="mt-4" ref={autoAnalyzeContainerRef}>
        <Adjuster {...autoReanalyzeProps} />
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default withOrientationChange(Auto);
