import React, { useState, useEffect } from "react";
import FileInput from "./components/FileInput/FileInput";
import ImageAnalyzer from "./components/ImageAnalyzer/ImageAnalyzer";
import { Button, Card, Accordion } from "react-bootstrap";
import Canvas from "./components/Canvas/Canvas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import sampleChart from "./sampleChart.png";

function App() {
  const [image, setImage] = useState({});
  const [canvasContext, setCanvasContext] = useState(null);
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    //loadImageToCanvas();
  }, [image]);

  async function loadImageToCanvas() {
    //const { current: canvas } = canvasRef;
    //clear(canvasContext, canvas);
    //const dimensions = drawImage(canvasContext, canvas, image);
    //setCanvasDimensions(dimensions);
  }

  return (
    <div className="App">
      <h4>Welcome to G-calc</h4>
      <div>
        <Canvas
          image={{
            imageSource: image,
            // imageData: image.imageData,
          }}
          canvasDimensions={{
            canvasWidth: image.width,
            canvasHeight: image.height,
          }}
          drawDimensions={{
            drawWidth: image.width,
            drawHeight: image.height,
          }}
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
                <FileInput accept="image/*" setFile={setImage} />
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
                  image={image}
                  canvasContext={[canvasContext, setCanvasContext]}
                  resetImage={loadImageToCanvas}
                  canvasDimensions={{ canvasDimensions }}
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
