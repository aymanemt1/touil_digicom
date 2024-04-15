import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { Translate } from "./homeTranslate";
import { LangueContext } from "../../Context/LangueContext";

export const Home = () => {
  function handleScroll() {
    const scrollTarget = document.getElementById("scrolbtnFn");
    scrollTarget.scrollIntoView({ behavior: "smooth" });
  }

  const {langue}=useContext(LangueContext)
  
  const Home = Translate.Home.find((lang)=>(
     lang.id == langue
   ))


  return (
    <Fragment>
      <div className={`parentHomev2 ${langue === 'ar' ? 'reverseContent' : ''}` } >
        <div className="parentText" data-aos="zoom-in-down" data-aos-duration="1500">
            <img src="./assets/illustrationsRemoveBg/Vector6.png" className="vector1" />
            <img  src="./assets/illustrationsRemoveBg/Vector7.png" className="vector2" />
          <h3>{Home.sous_title}</h3>
          <h1 >
           {Home.title}
          </h1>
          <p>
           {Home.text}
          </p>
          <div className="parentBtnsV2">

          <Link to="/">
            <button className="btnSeeMoreServices">{Home.btn}</button>
          </Link>
          <Link to="/">
            <button
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
          <img data-aos="zoom-in-up" data-aos-duration="600" src="./assets/illustrationsRemoveBg/illu.png" className={`illustatorHome ${langue === 'ar' ? 'illustatorArabe' : ''}` }/>
          <img src="./assets/GradientEffect/union.png" className="union"  />
          
          <img data-aos="zoom-out" data-aos-duration="2500" src="./assets/illustrationsRemoveBg/i9.png" className="illustrator2"  />
          <img data-aos="zoom-out" data-aos-duration="2500" src="./assets/illustrationsRemoveBg/i10.png" className="illustrator5"/>
          <img data-aos="zoom-out" data-aos-duration="2500" src="./assets/illustrationsRemoveBg/i12.png" className="illustrator4" />
        </div>
      </div>
    </Fragment>
  );
}
