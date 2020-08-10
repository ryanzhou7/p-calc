export function setImageOnload(source) {
  return (dispatch) => {
    const image = new Image();
    image.onload = () => {
      dispatch({ type: "IMAGE_SOURCE_SET", payload: image });
    };
    image.src = source;
  };
}

export function setImage(image) {
  return {
    type: "IMAGE_SET",
    payload: image,
  };
}

const initialState = {
  source: null,
  image: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "IMAGE_SOURCE_SET":
      return {
        ...state,
        source: action.payload,
      };
    case "IMAGE_SET":
      return {
        ...state,
        image: action.payload,
      };
    default:
      return state;
  }
}
