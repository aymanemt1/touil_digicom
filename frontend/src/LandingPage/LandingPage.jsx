import React, { Fragment, useEffect } from "react";
import Navbar from "./Navbar/navbar";
import './LandingPage.css';
import Home from "./Home/home";
import Adn from "./Adn/Adn";


export const LandingPage = () => {


  return (
    <Fragment>
      <div className="parentLandingPage">
        <Navbar />
        <Home />
        <Adn/>
      </div>
    </Fragment>
  );
};
