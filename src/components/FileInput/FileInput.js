import React from "react";
import { Form } from "react-bootstrap";

function FileInput(props) {
  const { label } = props;
  const { accept } = props;
  const { onChangeHandler } = props;
  return (
    <div>
      <Form.File
        type="file"
        accept={accept}
        label={label}
        style={inputStyle}
        custom
        onChange={(e) => onChangeHandler(e)}
      />
    </div>
  );
}

const inputStyle = {
  width: "300px",
};

export default FileInput;
