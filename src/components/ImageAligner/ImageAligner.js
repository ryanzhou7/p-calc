import React from "react";
import "./index.css";
import { incrementBy, incrementOrginCoordinates } from "./utils";
import { Button } from "react-bootstrap";

function ImageAligner(props) {
  const [rotationDegrees, setRotationDegrees] = props.rotationDegrees;
  const [axisCoordinates, setAxisCoordinates] = props.axisCoordinates;
  return (
    <div>
      <div>
        <div>Axis offset Y:{axisCoordinates.y}</div>
        <div>Move Vertical</div>
        <Button
          className="mx-1"
          onClick={(e) =>
            incrementOrginCoordinates(e, 0, -1, setAxisCoordinates)
          }
        >
          Move up
        </Button>
        <Button
          className="mx-1"
          onClick={(e) =>
            incrementOrginCoordinates(e, 0, 1, setAxisCoordinates)
          }
        >
          Move down
        </Button>
      </div>

      <div>
        <div>Degrees of rotation: {rotationDegrees}</div>
        <Button
          className="mx-1"
          onClick={(e) => incrementBy(e, setRotationDegrees, -1)}
        >
          Rotate left
        </Button>
        <Button
          className="mx-1"
          onClick={(e) => incrementBy(e, setRotationDegrees, 1)}
        >
          Rotate right
        </Button>
      </div>
    </div>
  );
}
export default ImageAligner;
