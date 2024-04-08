import React, { Fragment, useState } from "react";

import Navbar from "./Navbar/navbar";

import './LandingPage.css';

export const LandingPage = () => {

  return (
    <Fragment>
      <div className="parentLandingPage">
        <Navbar />
        {/* <Home />
        <References />
        <Adn /> */}
      </div>
    </Fragment>
  );
};
