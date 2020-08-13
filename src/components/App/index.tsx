import React from "react";
import AutoReanalyze from "../../pages/Auto/index";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faMinus, faPlus, faCamera } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faMinus, faPlus, faCamera);
function App() {
  return (
    <>
      <AutoReanalyze />
    </>
  );
}

export default App;
