import redux, { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export function increment() {
  return (dispatch, getState) => {
    dispatch({ type: "INCREMENT" });
  };
}

function reducer(count = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return count + 1;
    default:
      return count;
  }
}

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState));
export default store;
