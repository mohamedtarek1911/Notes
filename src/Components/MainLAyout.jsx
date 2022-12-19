import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const MainLAyout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLAyout;
