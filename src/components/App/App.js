import React, { useRef, useCallback } from "react";
import { Button, Card, Accordion } from "react-bootstrap";
import FileInput from "../FileInput/FileInput";
import ImageAnalyzer from "../ImageAnalyzer/ImageAnalyzer";
import Canvas from "../Canvas/Canvas";
import * as utils from "./utils";
import Webcam from "react-webcam";
import * as imageReducer from "../../redux/imageReducer";
import { useSelector, useDispatch } from "react-redux";
import { setContext as setInnerContext } from "../../redux/innerCanvasInfoReducer";
import { setContext as setOuterContext } from "../../redux/outerCanvasInfoReducer";

import "./App.css";

const videoConstraints = {
  width: 400,
  height: 400,
  //facingMode: { exact: "environment" },
  facingMode: "user",
};

function App() {
  const dispatch = useDispatch();
  const image = useSelector((state) => state.image.source);
  const isOuterEdit = useSelector((state) => state.canvasEdit.isOuterEdit);

  const innerCanvasContext = useSelector(
    (state) => state.innerCanvasInfo.context
  );
  const outerCanvasContext = useSelector(
    (state) => state.outerCanvasInfo.context
  );

  const canvasDimensions = {
    width: 400,
    height: 400,
  };

  const outerCanvasProps = {
    image: image,
    canvasDimensions: {
      canvasWidth: canvasDimensions.width,
      canvasHeight: canvasDimensions.height,
    },
    drawDimensions: {
      drawWidth: canvasDimensions.width,
      drawHeight: canvasDimensions.height,
    },
    canvasContext: [outerCanvasContext, setOuterContext],
  };

  const innerCanvasProps = {
    image: image,
    canvasDimensions: {
      canvasWidth: canvasDimensions.width,
      canvasHeight: canvasDimensions.height,
    },
    drawDimensions: {
      drawWidth: canvasDimensions.width,
      drawHeight: canvasDimensions.height,
    },
    canvasContext: [innerCanvasContext, setInnerContext],
  };

  const imageAnalyzerProps = {
    canvasDimensions: {
      canvasWidth: canvasDimensions.width,
      canvasHeight: canvasDimensions.height,
    },
  };

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const screenshot = webcamRef.current.getScreenshot();
    dispatch(imageReducer.setImage(screenshot));
  }, [webcamRef]);

  return (
    <div className="App">
      <h4>Welcome to P-calc</h4>

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
                    utils.saveSelectedImage(event, imageReducer.setImage)
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
                <div>{isOuterEdit && <Canvas {...outerCanvasProps} />}</div>
                <div>{!isOuterEdit && <Canvas {...innerCanvasProps} />}</div>
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
