import React, { useState } from "react";
import { Button, Card, Accordion } from "react-bootstrap";
import FileInput from "../FileInput/FileInput";
import ImageAnalyzer from "../ImageAnalyzer/ImageAnalyzer";
import Canvas from "../Canvas/Canvas";
import * as utils from "./utils";
import "./App.css";

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

  return (
    <div className="App">
      <h4>Welcome to G-calc</h4>
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
                  <Canvas isHidden={!isRedEdit} {...redCanvasProps} />
                </div>
                <div>
                  <Canvas isHidden={isRedEdit} {...blueCanvasProps} />
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
