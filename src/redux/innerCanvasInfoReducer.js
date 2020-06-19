export function setContext(context) {
  return { type: "SET_INNER_CONTEXT", payload: context };
}
export function setRecoloredImageData(recoloredImageData) {
  return {
    type: "SET_INNER_RECOLORED_IMAGE_DATA",
    payload: recoloredImageData,
  };
}
export function setDetectedPixels(detectedPixels) {
  return { type: "SET_INNER_DETECTED_PIXELS", payload: detectedPixels };
}
export function setNumColoredPixelsCallback(dispatch) {
  return (numColoredPixels) => {
    dispatch(setNumColoredPixels(numColoredPixels));
  };
}

export function setNumColoredPixels(numColoredPixels) {
  return { type: "SET_INNER_NUM_COLORED_PIXELS", payload: numColoredPixels };
}

export function setRecolorHex(hex) {
  return { type: "SET_INNER_RECOLOR_HEX", payload: hex };
}

const initialState = {
  context: null,
  recoloredImageData: null,
  numColoredPixels: 0,
  detectedPixels: [],
  recolorHex: "#00FF00",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_INNER_CONTEXT":
      return {
        ...state,
        context: action.payload,
      };
    case "SET_INNER_RECOLORED_IMAGE_DATA":
      return {
        ...state,
        recoloredImageData: action.payload,
      };
    case "SET_INNER_DETECTED_PIXELS":
      return {
        ...state,
        detectedPixels: action.payload,
      };
    case "SET_INNER_NUM_COLORED_PIXELS":
      return {
        ...state,
        numColoredPixels: action.payload,
      };

    case "SET_INNER_RECOLOR_HEX":
      return {
        ...state,
        recolorHex: action.payload,
      };
    default:
      return state;
  }
}
