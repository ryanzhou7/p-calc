export function setContext(context) {
  return { type: "SET_CONTEXT", payload: context };
}
const initialState = {
  context: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CONTEXT":
      return {
        ...state,
        context: action.payload,
      };
    default:
      return state;
  }
}
