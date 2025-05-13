import { Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage/HomePage";
import Layout from "./Component/Layout/Layout";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";


function App() {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout Component={HomePage} />} />
      </Routes>
    </>
  );
}

export default App;
