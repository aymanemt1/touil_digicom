import React, { Fragment, useState } from "react";
import Navbar from "./Navbar/navbar";
import Home from "./Home/home";
import './LandingPage.css';



export const LandingPage = () => {

  return (
    <Fragment>
      <div className="parentLandingPage">
        <Navbar />
        <Home />
      </div>
    </Fragment>
  );
};
