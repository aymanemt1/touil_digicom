import React, { Fragment, useState } from "react";
import { Home } from "./Home/Home";
import References from "./References/References";
import { Adn } from "./Adn/Adn";
import Navbar from "./Navbar/navbar";

import './LandingPage.css';

export const LandingPage = () => {

  const [langvalue, setLangValue] = useState('FR');
  // console.log(langvalue);

  return (
    <Fragment>
      <div className="parentLandingPage">
        <Navbar onSwitchLang={value => setLangValue(value)}/>
        <Home lang={langvalue}/>
        <References lang={langvalue}/>
        <Adn lang={langvalue}/>
      </div>
    </Fragment>
  );
};
