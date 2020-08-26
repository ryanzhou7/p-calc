"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = reducer;
var initialState = {
  videoConstraints: {
    // These numbers should match those in the canvas settings
    width: 400,
    height: 400,
    facingMode: {
      exact: "environment"
    },
    //facingMode: "user",
    audio: false,
    imageSmoothing: true,
    screenshotQuality: 1
  }
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    default:
      return state;
  }
}