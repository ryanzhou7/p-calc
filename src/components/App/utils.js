import * as DomHelper from "../../utils/DomHelper";
async function saveSelectedImage(event, setImage) {
  const image = await DomHelper.getImageFromInput(event, setImage);
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

export { saveSelectedImage, getCurrentViewportWidth, getProportionalX };
