import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

export const Home = () => {
  return (
    <Fragment>
      <div className="ParentHome">
        <center>
          <div className="ParentText">
            <h1>Renforcer la connectivité, transformer l'avenir.</h1>
            <p>
              Your digital success partner: Marketing, communication, events,
              and skill-building solutions all in one place.
            </p>
            <Link to="/">
              <button className="btnScroll">Scroll</button>
            </Link>
            <img src="./assets/illustrationsRemoveBg/VectorArrow.png" alt="" className="VectorArrow"/>
          </div>
          <div className="ParentIllustrationIcons">
            <img src="./assets/illustrationsRemoveBg/i1.png" alt="" className="i1"/>
            <img src="./assets/illustrationsRemoveBg/i2.png" alt="" className="i2"/>
            <img src="./assets/illustrationsRemoveBg/i3.png" alt="" className="i3"/>
            <img src="./assets/illustrationsRemoveBg/i5.png" alt="" className="i5"/>
            <img src="./assets/illustrationsRemoveBg/i7.png" alt="" className="i7"/>
            <img src="./assets/illustrationsRemoveBg/i8.png" alt="" className="i8"/>
          </div>
          <div className="ParentIllustration">
            <img
              src="./assets/illustrationsRemoveBg/IllMarketing.png"
              alt="Scroll"
              className="bigImgIll"
            />
          </div>
        </center>
      </div>
    </Fragment>
  );
};
