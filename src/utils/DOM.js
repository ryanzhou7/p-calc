// When user selects a new image
function handleImageInputChange(event, setImageSource) {
  // If it is valid
  if (event.target.files && event.target.files.item(0)) {
    // Grab the first file
    setImageSource(URL.createObjectURL(event.target.files[0]));
  }
}
export { handleImageInputChange };
