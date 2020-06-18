export function toggleIsOuterEdit() {
  return { type: "TOGGLE_IS_OUTER_EDIT" };
}

const initialState = {
  isOuterEdit: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_IS_OUTER_EDIT":
      return {
        ...state,
        isOuterEdit: !state.isOuterEdit,
      };
    default:
      return state;
  }
}
