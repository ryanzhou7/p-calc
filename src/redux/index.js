import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import imageReducer from "./imageReducer";
import canvasEditReducer from "./canvasEditReducer";
import innerCanvasInfoReducer from "./innerCanvasInfoReducer";
import outerCanvasInfoReducer from "./outerCanvasInfoReducer";
import combinedCanvasInfoReducer from "./combinedCanvasInfoReducer";
import canvasSettingsReducer from "./canvasSettingsReducer";

const rootReducer = combineReducers({
  image: imageReducer,
  canvasEdit: canvasEditReducer,
  innerCanvasInfo: innerCanvasInfoReducer,
  outerCanvasInfo: outerCanvasInfoReducer,
  combinedCanvasInfo: combinedCanvasInfoReducer,
  canvasSettings: canvasSettingsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
