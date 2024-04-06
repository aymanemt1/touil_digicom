import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

export const Home = (props) => {
  const [lang, setLang] = useState(props.lang);

  
  useEffect(() => {
    setLang(props.lang); 
  }, [props.lang]);


  function handleScroll() {
    const scrollTarget = document.getElementById('textIconScroll');
    scrollTarget.scrollIntoView({ behavior: 'smooth' });
}

  return (
    <Fragment>
      <div className="ParentHome"   >
        <center>
          <div className="ParentText">
            <h1>
              {lang == "FR" ? (
                <>
                  TOUIL DIGICOM <br /> Votre Aventure Digital <br /> Commencez
                  Ici
                </>
              ) : (
                <>
                  تويل ديجيكوم <br /> مغامرتك الرقمية <br /> أبدأ هنا
                </>
              )}
            </h1>
            <p>
              {lang == "FR"
                ? `Votre partenaire de réussite digitale : Marketing, communication, événementiel,et des solutions de développement des compétences en un seul endroit`
                : `شريكك للنجاح الرقمي: التسويق، والاتصالات، والأحداث،
                وحلول تنمية المهارات في مكان واحد.`}
            </p>
            <button className="btnScroll" id="scrollTarget" onClick={handleScroll}>
              <div className="point"></div>
            </button>
            <p id="textIconScroll">{lang == 'FR' ? 'défiler vers le bas' : 'حرك الفأرة لأسفل'}</p>
          </div>
          <div className="ParentIllustrationIcons">
            <img
              src="./assets/illustrationsRemoveBg/i1.png"
              alt=""
              className="i1"
            />
            <img
              src="./assets/illustrationsRemoveBg/i2.png"
              alt=""
              className="i2"
            />
            <img
              src="./assets/illustrationsRemoveBg/i3.png"
              alt=""
              className="i3"
            />
            <img
              src="./assets/illustrationsRemoveBg/i5.png"
              alt=""
              className="i5"
            />
            <img
              src="./assets/illustrationsRemoveBg/i7.png"
              alt=""
              className="i7"
            />
            <img
              src="./assets/illustrationsRemoveBg/i8.png"
              alt=""
              className="i8"
            />
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
