import React, { useState } from "react";
import { handleColorInputChange } from "../../utils/DOM";
import { toPixels } from "../../utils/ImageAnalysis";
import { Button, Form } from "react-bootstrap";

function ImageAnalyzer(props) {
  const { image } = props;
  const [redThreshold, setRedThreshold] = useState(0);
  const [canvasContext, setCanvasContext] = props.canvasContext;
  const [recolorHex, setRecolorHex] = useState("#0000FF");

  const recolorCanvas = () => {
    const imageData = toPixels(image, canvasContext, redThreshold, recolorHex);
    canvasContext.putImageData(imageData, 0, 0);
  };

  return (
    <div>
      <div>
        <Form>
          <Form.Group>
            <Form.Label>Recolor:</Form.Label>
            <Form.Control
              type="color"
              value={recolorHex}
              onChange={(e) => handleColorInputChange(e, setRecolorHex)}
            />
          </Form.Group>
        </Form>
      </div>
      <div>
        <Form.Group>
          <Form.Label>Sensitivity</Form.Label>
          <Form.Control
            type="range"
            min="0"
            max="255"
            value={redThreshold}
            onChange={(e) => setRedThreshold(e.target.value)}
          />
        </Form.Group>
      </div>
      <div>
        <Button onClick={(e) => recolorCanvas(e)}>Analyze</Button>
      </div>
    </div>
  );
}

export default ImageAnalyzer;
