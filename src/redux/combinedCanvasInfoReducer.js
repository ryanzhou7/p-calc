export function setContext(context) {
  return { type: "SET_COMBINE_CONTEXT", payload: context };
}
const initialState = {
  context: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_COMBINE_CONTEXT":
      return {
        ...state,
        context: action.payload,
      };
    default:
      return state;
  }
}
