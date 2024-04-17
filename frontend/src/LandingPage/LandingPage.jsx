import React, { Fragment, useContext, useEffect } from "react";
import Navbar from "./Navbar/navbar";
import './LandingPage.css';
import {Home} from "./Home/home";
import Adn from "./Adn/Adn";
import { WhyUs } from "./WhyUs/whyus";
import { Footer } from "./Footer/footer";
import { References } from "./References/References";
import { Statistique } from "./Statistique/Statistique";
import { HowItWorks } from "./HowItWorks/HowItWorks";
import Services from "./Services/Services";
import Video from "./Video/Video";
import FAQ from "./FAQ/FAQ";
import Devis from "./Devis/Devis";
import { LangueContext } from "../Context/LangueContext";

export const LandingPage = () => {
  return (
    <Fragment>
      <div className="parentLandingPage">
        <Home />
        <Adn/>
        <WhyUs />
        <Statistique />
        <HowItWorks />
        <Video />
        <Services />
        <FAQ />
        {/* <Devis /> */}
        <References />
        <Footer />
      </div>
    </Fragment>
  );
};
