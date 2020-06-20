export function setContext(context) {
  return { type: "SET_COMBINE_CONTEXT", payload: context };
}
export function setNumColoredInnerPixels(context) {
  return { type: "SET_NUM_COLORED_INNER_PIXELS", payload: context };
}
export function setNumColoredOuterPixels(context) {
  return { type: "SET_NUM_COLORED_OUTER_PIXELS", payload: context };
}
const initialState = {
  context: null,
  numColoredOuterPixels: 0,
  numColoredInnerPixels: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_COMBINE_CONTEXT":
      return {
        ...state,
        context: action.payload,
      };
    case "SET_NUM_COLORED_INNER_PIXELS":
      return {
        ...state,
        numColoredInnerPixels: action.payload,
      };
    case "SET_NUM_COLORED_OUTER_PIXELS":
      return {
        ...state,
        numColoredOuterPixels: action.payload,
      };
    default:
      return state;
  }
}
