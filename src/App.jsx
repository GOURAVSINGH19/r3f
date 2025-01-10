import React from "react";
import About from "./component/About";
import Home from "./component/Home";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Canvas from "./component/Canvas";
const App = () => {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
