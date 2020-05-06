// When user selects a new image
function handleInputChange(event, setImageSource) {
  // If it is valid
  if (event.target.files && event.target.files.item(0)) {
    // Set the src of the new Image() we created in javascript
    //srcImageRef.src = URL.createObjectURL(event.target.files[0]);
    setImageSource(URL.createObjectURL(event.target.files[0]));
  }
}

function handleImageLoad(canvas, srcImageRef, setSrcPixels) {}

export { handleInputChange, handleImageLoad };
