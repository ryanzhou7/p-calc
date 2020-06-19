export function setCanvasDimensions(dimensions) {
  return { type: "SET_CANVAS_DIMENSIONS", payload: dimensions };
}

const initialState = {
  canvasDimensions: {
    width: 400,
    height: 400,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CANVAS_DIMENSIONS":
      return {
        ...state,
        source: action.payload,
      };
    default:
      return state;
  }
}
