import React, { useState, useRef, useCallback } from "react";
import { Button, Card, Accordion } from "react-bootstrap";
import FileInput from "../FileInput/FileInput";
import ImageAnalyzer from "../ImageAnalyzer/ImageAnalyzer";
import Canvas from "../Canvas/Canvas";
import * as utils from "./utils";
import Webcam from "react-webcam";
import "./App.css";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: { exact: "environment" },
  //facingMode: "user",
};

function App() {
  const [image, setImage] = useState({});
  const [isRedEdit, setIsRedEdit] = useState(true);
  const [canvasContextRed, setCanvasContextRed] = useState(null);
  const [canvasContextBlue, setCanvasContextBlue] = useState(null);

  const [numPixelsColoredRed, setNumPixelsColoredRed] = useState(0);
  const [numPixelsColoredBlue, setNumPixelsColoredBlue] = useState(0);

  const width = Math.min(500, utils.getCurrentViewportWidth()) - 50;
  const height = utils.getProportionalX(image.height, image.width, width);
  const canvasDimensions = {
    width: width,
    height: height,
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
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = useCallback(() => {
    const screenshot = webcamRef.current.getScreenshot();
    setImgSrc(screenshot);
  }, [webcamRef, setImgSrc]);

  return (
    <div className="App">
      <h4>Welcome to P-calc</h4>
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
            top: 200,
            right: 0,
            bottom: 200,
            left: 0,
            backgroundColor: "green",
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
            top: 200,
            right: 0,
            bottom: 200,
            left: 0,
            backgroundColor: "green",
          }}
        ></span>
      </div>

      <button onClick={capture}>Take picture</button>

      <div>{imgSrc && <img src={imgSrc} />}</div>

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
