import React, { useRef } from "react";
import { handleImageInputChange } from "../../utils/DOM";

function ImageInput(props) {
  const { imageSetter } = props;
  const imageInputRef = useRef(null);
  return (
    <div>
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleImageInputChange(e, imageSetter)}
      />
    </div>
  );
}

export default ImageInput;
