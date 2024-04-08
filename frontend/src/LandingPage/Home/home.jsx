import { Fragment } from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Home() {
  function handleScroll() {
    const scrollTarget = document.getElementById("scrolbtnFn");
    scrollTarget.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Fragment>
      <div className="parentHomev2">
        <div className="parentText">
            <img src="./assets/illustrationsRemoveBg/Vector6.png" className="vector1" />
            <img src="./assets/illustrationsRemoveBg/Vector7.png" className="vector2" />
          <h6>TOUIL DIGICOM</h6>
          <h1>
            Votre Aventure Digital <br /> Commencez Ici.
          </h1>
          <p>
            Votre partenaire de réussite digitale : Marketing, communication,
            événementiel, et des solutions de développement des compétences en
            un seul endroit.
          </p>
          <div className="parentBtnsV2">

          <Link to="/">
            <button className="btnSeeMoreServices">voir nos prestations</button>
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
          <img src="./assets/illustrationsRemoveBg/illu.webp" className="illustatorHome"/>
          
          <img src="./assets/illustrationsRemoveBg/i9.png" className="illustrator1"  />
          <img src="./assets/illustrationsRemoveBg/i9.png" className="illustrator2"  />
          <img src="./assets/illustrationsRemoveBg/i10.png" className="illustrator5"/>
          <img src="./assets/illustrationsRemoveBg/i11.png" className="illustrator3" />
          <img src="./assets/illustrationsRemoveBg/i12.png" className="illustrator4" />
        </div>
      </div>
    </Fragment>
  );
}
