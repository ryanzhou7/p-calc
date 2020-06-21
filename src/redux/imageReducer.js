export function setImage(source) {
  return (dispatch) => {
    const image = new Image();
    image.onload = () => {
      dispatch({ type: "IMAGE_SET", payload: image });
    };
    image.src = source;
  };
}

export function setImageCallback(dispatch) {
  return (image) => {
    dispatch({
      type: "IMAGE_SET",
      payload: image,
    });
  };
}

const initialState = {
  source: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "IMAGE_SET":
      return {
        ...state,
        source: action.payload,
      };
    default:
      return state;
  }
}
