import React from "react";
import Gallery from "./components/Gallery";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="gallery" element={<Gallery />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
