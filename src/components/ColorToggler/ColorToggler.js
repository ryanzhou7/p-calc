import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import * as canvasEditReducer from "../../redux/canvasEditReducer";
import React from "react";
function ColorToggler() {
  const isOuterEdit = useSelector((state) => state.canvasEdit.isOuterEdit);
  const dispatch = useDispatch();
  const canvasEditToggler = () => {
    dispatch(canvasEditReducer.toggleIsOuterEdit());
  };
  return (
    <div>
      <div>Currently editing:</div>
      <Button
        active={isOuterEdit}
        className="mr-2"
        variant="outline-danger"
        onClick={canvasEditToggler}
      >
        Outer
      </Button>
      <Button
        active={!isOuterEdit}
        variant="outline-primary"
        onClick={canvasEditToggler}
      >
        Inner
      </Button>
    </div>
  );
}

export default ColorToggler;
