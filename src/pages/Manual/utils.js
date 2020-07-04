import * as DomHelper from "../../utils/DomHelper";
async function saveSelectedImage(event, setImage) {
  const image = await DomHelper.getImageFromInput(event);
  setImage(image);
}

function getCurrentViewportWidth() {
  return Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
}

function getProportionalX(originalX, originalY, proportionalY) {
  return (originalX * proportionalY) / originalY;
}

function downloadJpegInClient(imageData, fileName) {
  const a = document.createElement("a");
  a.href = imageData;
  a.download = fileName + ".jpeg";
  a.click();
}

function getImageDataForCombinedContext() {}

export {
  saveSelectedImage,
  getCurrentViewportWidth,
  getProportionalX,
  getImageDataForCombinedContext,
  downloadJpegInClient,
};
