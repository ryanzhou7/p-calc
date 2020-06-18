import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import imageReducer from "./imageReducer";
import canvasEditReducer from "./canvasEditReducer";
import innerCanvasInfoReducer from "./innerCanvasInfoReducer";
import outerCanvasInfoReducer from "./outerCanvasInfoReducer";

const rootReducer = combineReducers({
  image: imageReducer,
  canvasEdit: canvasEditReducer,
  innerCanvasInfo: innerCanvasInfoReducer,
  outerCanvasInfo: outerCanvasInfoReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
