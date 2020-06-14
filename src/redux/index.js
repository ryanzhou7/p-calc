import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import imageReducer from "./imageReducer";

const rootReducer = combineReducers({ image: imageReducer });

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
