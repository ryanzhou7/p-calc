import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import imageReducer from "./imageReducer";
import innerCanvasInfoReducer from "./innerCanvasInfoReducer";
import outerCanvasInfoReducer from "./outerCanvasInfoReducer";
import combinedCanvasInfoReducer from "./combinedCanvasInfoReducer";
import canvasSettingsReducer from "./canvasSettingsReducer";
import videoReducer from "./videoReducer";
import downloadReducer from "./downloadReducer";

const rootReducer = combineReducers({
  image: imageReducer,
  innerCanvasInfo: innerCanvasInfoReducer,
  outerCanvasInfo: outerCanvasInfoReducer,
  combinedCanvasInfo: combinedCanvasInfoReducer,
  canvasSettings: canvasSettingsReducer,
  videoReducer: videoReducer,
  downloadReducer: downloadReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
