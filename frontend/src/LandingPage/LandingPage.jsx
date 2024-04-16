import React, { Fragment, useEffect } from "react";
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

export const LandingPage = () => {

  return (
    <Fragment>
      <div className="parentLandingPage">
        <Navbar />
        <Home />
        <Adn/>
        <WhyUs />
        <HowItWorks />
        <Statistique />
        <Video />
        <Services />
        <FAQ />
        <Devis />
        <References />
        <Footer />
      </div>
    </Fragment>
  );
};
