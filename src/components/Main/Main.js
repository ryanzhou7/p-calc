import React, { useRef, useEffect, useState } from "react";
import { Button, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { withOrientationChange } from "react-device-detect";
import Webcam from "react-webcam";
import * as imageReducer from "../../redux/imageReducer";
import { useSelector, useDispatch } from "react-redux";
import Adjuster from "../Adjuster/Adjuster";
import target from "../../assets/target/circle.png";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import sampleChart from "../../assets/sample/fail-2.jpeg";
import * as DomHelper from "../../utils/DomHelper";

// For the analysis
const START_THRESHOLD = 20;
let imageForDownload = null;

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

  // Set a default image for debuggin bad images
  useEffect(() => {
    //dispatch(imageReducer.setImageOnload(sampleChart));
  }, []);

  const capture = () => {
    if (!isCameraOn) {
      setIsCameraOn(true);
      return;
    }

    // reset threshold
    setThreshold(START_THRESHOLD);

    const screenshot = webcamRef.current.getScreenshot();
    dispatch(imageReducer.setImageOnload(screenshot));
    dispatch(imageReducer.setImage(screenshot));
    window.scrollTo(0, autoAnalyzeContainerRef.current.offsetTop);

    setIsCameraOn(false);

    imageForDownload = screenshot;
    // Download image
    //DomHelper.downloadJpegInClient(screenshot, "fail");
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

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );

  return (
    <div className="App">
      <Card className="mt-4">
        {/* <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        > */}
        <h2 className="card-title">
          Capture chart{" "}
          {/*<FontAwesomeIcon icon="question-circle" size="1x" /> */}
        </h2>
        {/* </OverlayTrigger> */}
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

      {/* Download picture */}
      {/* <button
        onClick={() => DomHelper.downloadJpegInClient(imageForDownload, "fail")}
      >
        Download
      </button> */}

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
