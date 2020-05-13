import React from "react";
import { handleImageInputChange } from "../../utils/DOM";
import { FormControl, Form, Button } from "react-bootstrap";

function ImageInput(props) {
  const { setImage } = props;
  return (
    <div>
      <Form.File
        type="file"
        accept="image/*"
        label="Custom file input"
        style={inputStyle}
        custom
        onChange={(e) => handleImageInputChange(e, setImage)}
      />
    </div>
  );
}

const inputStyle = {
  width: "300px",
};

export default ImageInput;
