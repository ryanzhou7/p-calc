const initialState = {
  videoConstraints: {

    // These numbers should match those in the canvas settings
    width: 400,
    height: 400,
    facingMode: { exact: "environment" },
    //facingMode: "user",
    audio: false,
    imageSmoothing: true,
    screenshotQuality: 1,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
