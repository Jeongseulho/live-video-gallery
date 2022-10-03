import React from "react";
import Gallery from "./components/Gallery/Gallery";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="gallery" element={<Gallery />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
