import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as canvasEditReducer from "../../redux/canvasEditReducer";
import React from "react";
function ColorToggler() {
  const isRedEdit = true;
  //const isRedEdit = useSelector((state) => state.isRedEdit);
  const dispatch = useDispatch();
  const redToggler = () => {
    dispatch(canvasEditReducer.toggleIsRedEdit());
  };
  return (
    <div>
      <div>Currently editing:</div>
      <Button
        active={isRedEdit}
        className="mr-2"
        variant="outline-danger"
        onClick={redToggler}
      >
        Red
      </Button>
      <Button
        active={!isRedEdit}
        variant="outline-primary"
        onClick={redToggler}
      >
        Blue
      </Button>
    </div>
  );
}

export default ColorToggler;
