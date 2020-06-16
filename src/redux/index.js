import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import imageReducer from "./imageReducer";
import canvasEditReducer from "./canvasEditReducer";

const rootReducer = combineReducers({
  image: imageReducer,
  canvasEdit: canvasEditReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
