export function setImage(source) {
  return (dispatch) => {
    const image = new Image();
    image.onload = () => {
      dispatch({ type: "IMAGE_LOADED", payload: image });
    };
    image.src = source;
  };
}

export default function reducer(source = null, action) {
  switch (action.type) {
    case "IMAGE_LOADED":
      return action.payload;
    default:
      return source;
  }
}
