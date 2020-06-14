import React, { useState, useRef, useCallback } from "react";
import { Button, Card, Accordion } from "react-bootstrap";
import FileInput from "../FileInput/FileInput";
import ImageAnalyzer from "../ImageAnalyzer/ImageAnalyzer";
import Canvas from "../Canvas/Canvas";
import * as utils from "./utils";
import Webcam from "react-webcam";
import { increment } from "../../redux/index";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: { exact: "environment" },
  //facingMode: "user",
};

function App() {
  const count = useSelector((state) => state);
  const dispatch = useDispatch();

  const [image, setImage] = useState({});
  const [isRedEdit, setIsRedEdit] = useState(true);
  const [canvasContextRed, setCanvasContextRed] = useState(null);
  const [canvasContextBlue, setCanvasContextBlue] = useState(null);

  const [numPixelsColoredRed, setNumPixelsColoredRed] = useState(0);
  const [numPixelsColoredBlue, setNumPixelsColoredBlue] = useState(0);
  const canvasDimensions = {
    width: 400,
    height: 400,
  };

  const redCanvasProps = {
    image: image,
    canvasDimensions: {
      canvasWidth: canvasDimensions.width,
      canvasHeight: canvasDimensions.height,
    },
    drawDimensions: {
      drawWidth: canvasDimensions.width,
      drawHeight: canvasDimensions.height,
    },
    canvasContext: [canvasContextRed, setCanvasContextRed],
  };

  const blueCanvasProps = {
    ...redCanvasProps,
    canvasContext: [canvasContextBlue, setCanvasContextBlue],
  };

  const currentCanvasContext = isRedEdit
    ? [canvasContextRed, setCanvasContextRed]
    : [canvasContextBlue, setCanvasContextBlue];

  const imageAnalyzerProps = {
    image: [image, setImage],
    isRedEdit: [isRedEdit, setIsRedEdit],
    canvasContext: currentCanvasContext,
    canvasDimensions: {
      canvasWidth: canvasDimensions.width,
      canvasHeight: canvasDimensions.height,
    },
    numPixelsColoredRed: [numPixelsColoredRed, setNumPixelsColoredRed],
    numPixelsColoredBlue: [numPixelsColoredBlue, setNumPixelsColoredBlue],
  };

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const screenshot = webcamRef.current.getScreenshot();

    const image = new Image();
    image.onload = () => {
      setImage(image);
    };
    image.src = screenshot;

    //setImage(screenshot);
  }, [webcamRef, setImage]);

  return (
    <div className="App">
      <h4>Welcome to P-calc</h4>
      <div>{count}</div>
      <button onClick={() => dispatch(increment())}>Increment</button>

      <div>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Image input
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <div
                  style={{
                    position: "relative",
                    backgroundColor: "grey",
                    height: "800",
                    display: "inline-block",
                  }}
                >
                  <Webcam
                    audio={false}
                    height={400}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={400}
                    videoConstraints={videoConstraints}
                  />
                  <span
                    className="cross"
                    style={{
                      position: "absolute",
                      top: 202,
                      right: 0,
                      bottom: 202,
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
                      top: 202,
                      right: 0,
                      bottom: 202,
                      left: 0,
                      backgroundColor: "red",
                    }}
                  ></span>
                </div>

                <div className="my-3">
                  <Button onClick={capture} variant="outline-primary">
                    Take picture
                  </Button>
                </div>

                <FileInput
                  accept="image/*"
                  label="Choose image"
                  onChangeHandler={(event) =>
                    utils.saveSelectedImage(event, setImage)
                  }
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Image analysis
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <div>
                  <Canvas {...redCanvasProps} />
                </div>
                <div>
                  <Canvas {...blueCanvasProps} />
                </div>
                <ImageAnalyzer {...imageAnalyzerProps} />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </div>
  );
}

export default App;
