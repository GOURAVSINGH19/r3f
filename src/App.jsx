import React from "react";
import Cnva from "./component/Canvas";
import Home from "./component/Home";
import Images from "./component/Images";

const App = () => {
  return (
    <div className="w-screen h-screen">
      <Images />
      {/* <Home/> */}
      <Cnva />
    </div>
  );
};

export default App;
