async function handleImageInputChange(event) {
  return new Promise((resolve) => {
    if (event.target.files && event.target.files.item(0)) {
      const imageSource = URL.createObjectURL(event.target.files[0]);
      const image = new Image();
      image.onload = () => resolve(image);
      image.src = imageSource;
    }
  });
}

function handleColorInputChange(e, setter) {
  const { value } = e.target;
  setter(value);
}

export { handleImageInputChange, handleColorInputChange };
