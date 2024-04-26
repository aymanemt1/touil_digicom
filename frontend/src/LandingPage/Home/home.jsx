import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { Translate } from "./homeTranslate";
import { LangueContext } from "../../Context/LangueContext";
import { Link as ScrollLink } from "react-scroll";

export const Home = () => {
  function handleScroll() {
    const scrollTarget = document.getElementById("scrolbtnFn");
    scrollTarget.scrollIntoView({ behavior: "smooth" });
  }

  const { langue } = useContext(LangueContext);

  const Home = Translate.Home.find((lang) => lang.id == langue);

  return (
    <Fragment>
      <div
        className={`parentHomev2 ${langue === "ar" ? "reverseContent" : ""}`}
      >
        <div className="parentText">
          <img
            src="./assets/illustrationsRemoveBg/Vector6.png"
            className="vector1"
          />
          <img
            src="./assets/illustrationsRemoveBg/Vector7.png"
            className="vector2"
          />
          <h3>{Home.sous_title}</h3>
          <h1 id={langue == "ar" ? "titleHomeArabic" : ""}>{Home.title}</h1>
          <p>{Home.text}</p>
          <div className="parentBtnsV2">
            <ScrollLink to="services" smooth={true} duration={2000}>
              <button className="btnSeeMoreServices">
                {Home.btn} <i className="bx bxs-down-arrow-circle"></i>
              </button>
            </ScrollLink>
            <Link to="/">
              <button
                title="Scroll Down"
                className="btnScrollV2"
                id="scrolbtnFn"
                onClick={handleScroll}
              >
                <div className="pointV2">.</div>
              </button>
            </Link>
          </div>
        </div>
        <div className="parentimg">
          <img
            src="./assets/illustrationsRemoveBg/illu.png"
          className="illustatorHome"
          />
          <img src="./assets/GradientEffect/union.png" className="union" />

          <img
            src="./assets/illustrationsRemoveBg/i9.png"
            className="illustrator2"
          />
          <img
            src="./assets/illustrationsRemoveBg/i10.png"
            className="illustrator5"
          />
          <img
            src="./assets/illustrationsRemoveBg/i12.png"
            className="illustrator4"
          />
        </div>
      </div>
    </Fragment>
  );
};
