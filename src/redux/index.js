import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import imageReducer from "./imageReducer";
import canvasEditReducer from "./canvasEditReducer";
import innerCanvasInfoReducer from "./innerCanvasInfoReducer";
import outerCanvasInfoReducer from "./outerCanvasInfoReducer";
import combinedCanvasInfoReducer from "./combinedCanvasInfoReducer";
import canvasSettingsReducer from "./canvasSettingsReducer";
import videoReducer from "./videoReducer";

const rootReducer = combineReducers({
  image: imageReducer,
  canvasEdit: canvasEditReducer,
  innerCanvasInfo: innerCanvasInfoReducer,
  outerCanvasInfo: outerCanvasInfoReducer,
  combinedCanvasInfo: combinedCanvasInfoReducer,
  canvasSettings: canvasSettingsReducer,
  videoReducer: videoReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
