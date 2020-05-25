import React from "react";
import { Form } from "react-bootstrap";

function FileInput(props) {
  const { label, accept, onChangeHandler } = props;
  return (
    <div>
      <Form.File
        type="file"
        accept={accept}
        label={label}
        style={inputStyle}
        custom
        onChange={(event) => onChangeHandler(event)}
      />
    </div>
  );
}

const inputStyle = {
  width: "300px",
};

export default FileInput;
