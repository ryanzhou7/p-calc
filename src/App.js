import React, { useState, useLayoutEffect } from "react";
import FileInput from "./components/FileInput/FileInput";
import ImageAnalyzer from "./components/ImageAnalyzer/ImageAnalyzer";
import { Button, Card, Accordion } from "react-bootstrap";
import Canvas from "./components/Canvas/Canvas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { handleImageInputChange } from "./utils/DOM";

function App() {
  const [image, setImage] = useState({});
  const [canvasContext, setCanvasContext] = useState(null);
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    setCanvasDimensions({
      width: image.width,
      height: image.height,
    });
  }, image);

  const saveSelectedImage = async (e) => {
    const image = await handleImageInputChange(e, setImage);
    setImage(image);
  };

  return (
    <div className="App">
      <h4>Welcome to G-calc</h4>
      <div>
        <Canvas
          image={{
            image: image,
            imageData: image.imageData,
          }}
          canvasDimensions={{
            canvasWidth: image.width,
            canvasHeight: image.height,
          }}
          drawDimensions={{
            drawWidth: image.width,
            drawHeight: image.height,
          }}
          canvasContext={[canvasContext, setCanvasContext]}
        />
      </div>
      <div>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                1. Image input
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <FileInput
                  accept="image/*"
                  label="Choose image"
                  onChangeHandler={saveSelectedImage}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                2. Image analysis
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <ImageAnalyzer
                  image={[image, setImage]}
                  canvasContext={[canvasContext, setCanvasContext]}
                  canvasDimensions={{
                    canvasWidth: image.width,
                    canvasHeight: image.height,
                  }}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </div>
  );
}

export default App;
