import React from "react";
import { handleImageInputChange } from "../../utils/DOM";

function ImageInput(props) {
  const { setImage } = props;
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageInputChange(e, setImage)}
      />
    </div>
  );
}

export default ImageInput;
