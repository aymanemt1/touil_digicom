import React, { Fragment, useEffect } from "react";
import Navbar from "./Navbar/navbar";
import './LandingPage.css';
import Home from "./Home/home";


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
