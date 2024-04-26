import React, { Fragment, useContext, useEffect } from "react";
import "./LandingPage.css";
import { Home } from "./Home/home";
import Adn from "./Adn/Adn";
import { WhyUs } from "./WhyUs/whyus";
import { References } from "./References/References";
import { Statistique } from "./Statistique/Statistique";
import { HowItWorks } from "./HowItWorks/HowItWorks";
import Services from "./Services/Services";
import Video from "./Video/Video";
import FAQ from "./FAQ/FAQ";
import Devis from "./Devis/Devis";
import { Link as ScrollLink, Element, animateScroll as scroll, } from "react-scroll";

export const LandingPage = () => {
  return (
    <Fragment>
      <div className="parentLandingPage">
        <Element name="home">
          <Home />
        </Element>
        <Element name="adn">
          <Adn />
        </Element>
        <Element name="whyUs">
          <WhyUs />
        </Element>
        <Statistique />
        <HowItWorks />
        <Element name="video">
          <Video />
        </Element>
        <Element name="services">
          <Services />
        </Element>
        <Element name="devis">
          <Devis />
        </Element>
        <Element name="faq">
          <FAQ />
        </Element>
      </div>
    </Fragment>
  );
};
