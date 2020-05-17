async function handleImageInputChange(event, setImage) {
  if (event.target.files && event.target.files.item(0)) {
    const imageSource = URL.createObjectURL(event.target.files[0]);
    const image = new Image();
    image.src = imageSource;
    image.onload = () => {
      setImage(image);
    };
  }
}

function handleColorInputChange(e, setter) {
  const { value } = e.target;
  setter(value);
}

export { handleImageInputChange, handleColorInputChange };
