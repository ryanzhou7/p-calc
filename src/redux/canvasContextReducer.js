export function setContext1(context) {
  return { type: "SET_CONTEXT_1", payload: context };
}

export function setContext2(context) {
  return { type: "SET_CONTEXT_2", payload: context };
}

const initialState = {
  context1: undefined,
  context2: undefined,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CONTEXT_1":
      return {
        ...state,
        context1: action.payload,
      };
    case "SET_CONTEXT_2":
      return {
        ...state,
        context2: action.payload,
      };
    default:
      return state;
  }
}
