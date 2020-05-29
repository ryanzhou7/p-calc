import { Button } from "react-bootstrap";
import React from "react";
function ColorToggler(props) {
  const [isRedEdit, setIsRedEdit] = props.isRedEdit;
  const redToggler = () => {
    setIsRedEdit((prev) => !prev);
  };
  return (
    <div>
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
