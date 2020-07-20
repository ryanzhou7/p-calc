/**
 * Return the image with it's source loaded from an file input
 * @param {*} event
 */
async function getImageFromInput(event) {
  return new Promise((resolve, reject) => {
    if (event.target.files && event.target.files.item(0)) {
      const imageSource = URL.createObjectURL(event.target.files[0]);
      const image = new Image();
      image.onload = () => resolve(image);
      image.src = imageSource;
      return;
    }
    reject("No file selected");
  });
}

function downloadJpegInClient(imageData, fileName) {
  const a = document.createElement("a");
  a.href = imageData;
  a.download = fileName + ".jpeg";
  a.click();
}

function setFromInput(event, setter) {
  const { value } = event.target;
  setter(value);
}

export { getImageFromInput, setFromInput, downloadJpegInClient };
