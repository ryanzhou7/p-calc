import React from "react";
import { handleImageInputChange } from "../../utils/DOM";
import { Form } from "react-bootstrap";

function FileInput(props) {
  const { setFile } = props;
  const { accept } = props;
  return (
    <div>
      <Form.File
        type="file"
        accept={accept}
        label="Custom file input"
        style={inputStyle}
        custom
        onChange={(e) => handleImageInputChange(e, setFile)}
      />
    </div>
  );
}

const inputStyle = {
  width: "300px",
};

export default FileInput;
