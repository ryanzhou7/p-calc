import React, { useState, useRef, useEffect } from "react";
import ImageInput from "./components/ImageInput/ImageInput";
import ImageAligner from "./components/ImageAligner/ImageAligner";
import ImageAnalyzer from "./components/ImageAnalyzer/ImageAnalyzer";
import { Button, Card, Accordion } from "react-bootstrap";
import { drawRotated, drawAxis, drawImage, clear } from "./utils/Canvas";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [canvasContext, setCanvasContext] = useState(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [axisCoordinates, setAxisCoordinates] = useState({ x: 0, y: 0 });
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const canvasRef = useRef(null);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    const context = canvas.getContext("2d");
    setCanvasContext(context);
  }, []);

  useEffect(() => {
    loadImageToCanvas();
  }, [image]);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    clear(canvasContext, canvas);
    drawRotated(canvasContext, canvas, rotationDegrees, image);
  }, [rotationDegrees]);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    clear(canvasContext, canvas);
    drawRotated(canvasContext, canvas, rotationDegrees, image);
    drawAxis(canvasContext, canvasRef.current, axisCoordinates, image);
  }, [axisCoordinates]);

  async function loadImageToCanvas() {
    const { current: canvas } = canvasRef;
    clear(canvasContext, canvas);
    const dimensions = drawImage(canvasContext, canvas, image);
    setCanvasDimensions(dimensions);
  }

  return (
    <div className="App">
      <h4>Welcome to G-calc</h4>
      <div>
        <canvas ref={canvasRef} className="preview-canvas" />
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
                <ImageInput setImage={setImage} />
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
                  canvasDimensions={canvasDimensions}
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
