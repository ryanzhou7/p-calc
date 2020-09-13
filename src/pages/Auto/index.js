import React, { useRef, useEffect } from "react";
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
  const autoAnalyzeContainerRef = useRef(null);

  // UseEffect - Remove this later, just for testing
  useEffect(() => {
    //dispatch(imageReducer.setImageOnload(sampleChart));
  }, []);

  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    dispatch(imageReducer.setImageOnload(screenshot));
    dispatch(imageReducer.setImage(screenshot));
    window.scrollTo(0, autoAnalyzeContainerRef.current.offsetTop);
  };

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
      <Card className="mt-4">
        <h2 className="card-title">Capture chart</h2>
        <div className="mx-auto">
          <div className="capture-container mx-auto">
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
                //width -20 leaves some padding on the left and right side
                style={{ width: videoConstraints.width - 20 }}
                src={target}
              />
            </div>
          </div>
        </div>
        <div className="my-2 z-top mx-auto">
          <Button className="capture-button" onClick={() => capture()}>
            <FontAwesomeIcon icon="camera" size="3x" />
          </Button>
        </div>
      </Card>
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
