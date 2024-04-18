import React, { Fragment, useContext, useEffect } from "react";
import Navbar from "./Navbar/navbar";
import "./LandingPage.css";
import { Home } from "./Home/Home";
import Adn from "./Adn/Adn";
import { WhyUs } from "./WhyUs/whyus";
import { Footer } from "./Footer/footer";
import { References } from "./References/References";
import { Statistique } from "./Statistique/Statistique";
import {HowItWorks} from "./HowItWorks/HowItWorks"
import Services from "./Services/Services";
import Video from "./Video/Video";
import FAQ from "./FAQ/FAQ";
import Devis from "./Devis/Devis";
import { LangueContext } from "../Context/LangueContext";

import {
  Link as ScrollLink,
  Element,
  animateScroll as scroll,
} from "react-scroll";

export const LandingPage = () => {
  return (
    <Fragment>
      <div className="parentLandingPage">
        <Home />
        <Element name="adn">
          <Adn />
        </Element>
        <Element name="whyUs">
        <WhyUs />
        </Element>
        <Statistique />
        <HowItWorks />
        <Video />
        <Services />
        <Element name="devis">
          <Devis />
        </Element>
        <Element name="faq">
          <FAQ />
        </Element>
        <References />
      </div>
    </Fragment>
  );
};
