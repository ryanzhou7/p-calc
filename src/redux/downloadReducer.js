export function setThreshold(threshold) {
  return { type: "SET_THRESHOLD", payload: threshold };
}

export function setAge(age) {
  return { type: "SET_AGE", payload: age };
}

export function setSex(age) {
  return { type: "SET_SEX", payload: age };
}

export function setNote(note) {
  return { type: "SET_NOTE", payload: note };
}

const initialState = {
  threshold: 20,
  age: "",
  sex: "",
  note: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_THRESHOLD":
      return {
        ...state,
        threshold: action.payload,
      };

    case "SET_AGE":
      return {
        ...state,
        age: action.payload,
      };

    case "SET_SEX":
      return {
        ...state,
        sex: action.payload,
      };

    case "SET_NOTE":
      return {
        ...state,
        note: action.payload,
      };

    default:
      return state;
  }
}
