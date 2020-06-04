import React, { useEffect } from "react";
import "./index.css";
import { incrementBy } from "./utils";
import { Button } from "react-bootstrap";

function ImageAligner(props) {
  const [rotationDegrees, setRotationDegrees] = props.rotationDegrees;
  const [axisCoordinates, setAxisCoordinates] = props.axisCoordinates;

  const [image] = props.image;
  const [canvasContext] = props.canvasContext;
  const { canvasWidth, canvasHeight } = props.canvasDimensions;

  useEffect(() => {
    if (canvasContext === null) {
      return;
    }
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
    canvasContext.save();

    // move to the center of the canvas
    canvasContext.translate(canvasWidth / 2, canvasHeight / 2);

    // rotate the canvas to the specified degrees
    canvasContext.rotate(rotationDegrees / 180);

    // draw the image
    // since the context is rotated, the image will be rotated also
    canvasContext.drawImage(
      image,
      -canvasHeight / 2,
      -canvasWidth / 2,
      canvasWidth,
      canvasHeight
    );

    // we’re done with the rotating so restore the unrotated context
    canvasContext.restore();
  }, [rotationDegrees]);

  return (
    <div>
      {/* <div>
        <div>Axis offset Y:{axisCoordinates.y}</div>
        <div>Move Vertical</div>
        <Button
          className="mx-1"
          onClick={(event) =>
            incrementOrginCoordinates(event, 0, -1, setAxisCoordinates)
          }
        >
          Move up
        </Button>
        <Button
          className="mx-1"
          onClick={(event) =>
            incrementOrginCoordinates(event, 0, 1, setAxisCoordinates)
          }
        >
          Move down
        </Button>
      </div> */}

      <div>
        <div>Degrees of rotation: {rotationDegrees}</div>
        <Button
          className="mx-1"
          onClick={(event) => incrementBy(event, setRotationDegrees, -1)}
        >
          Rotate left
        </Button>
        <Button
          className="mx-1"
          onClick={(event) => incrementBy(event, setRotationDegrees, 1)}
        >
          Rotate right
        </Button>
      </div>
    </div>
  );
}
export default ImageAligner;
