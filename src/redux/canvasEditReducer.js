export function toggleIsRedEdit() {
  return { type: "TOGGLE_IS_RED_EDIT" };
}

const initialState = {
  isRedEdit: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_IS_RED_EDIT":
      return {
        ...state,
        isRedEdit: !state.isRedEdit,
      };
    default:
      return state;
  }
}
