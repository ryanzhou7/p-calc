import React from "react";
import { handleImageInputChange } from "../../utils/DOM";
import { FormControl, Form, Button } from "react-bootstrap";

function ImageInput(props) {
  const { setImage } = props;
  return (
    <div>
      <Form>
        <Form.File
          type="file"
          accept="image/*"
          label="Custom file input"
          custom
          onChange={(e) => handleImageInputChange(e, setImage)}
        />
      </Form>
    </div>
  );
}

export default ImageInput;
