import React from "react";
import Main from "../Main/Main";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faMinus, faPlus, faCamera, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faMinus, faPlus, faCamera, faQuestionCircle);
function App() {
  return (
    <>
      <Main />
    </>
  );
}

export default App;
