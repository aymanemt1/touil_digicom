import React, { useContext, useState } from "react";
import "./Adn.css";
import Popup from "./Popup/Popup";
import { LangueContext } from "../../Context/LangueContext";
import { Translate } from "./adntranslate";
import { Link as ScrollLink } from "react-scroll";

export const Adn = () => {
  const [btnPopup, setBtnPopup] = useState(false);
  const [name, setName] = useState("");

  const openPopup = (name) => {
    setBtnPopup(true);
    setName(name);
  };

  const { langue } = useContext(LangueContext);

  const Adn = Translate.Adn.find((lang) => lang.id == langue);

  return (
    <>
      <div className="AdnContent" >
        <div className="AdnText" data-aos="zoom-out">
          <h1 className="h1LandingPage">{Adn.title}</h1>
          <p>
            {Adn.text}
            <ScrollLink to="whyUs" smooth={true} duration={2000}>
              <button className="buttonMore">
                {Adn.btn_text}
                <i className="bx bxs-down-arrow-circle"></i>
              </button>
            </ScrollLink>
          </p>
        </div>
      </div>
      <div className="Team" >
        <h1 className="h1LandingPage">{Adn.equipe_title}</h1>
          <div className="card">
            <div id="bordercom">
              <div className="card-img" id="com"></div>
            </div>
            <h5 className="card-title">Douae FRIHI</h5>
            <p className="p"> {Adn.role[0]}</p>
            <button
              title="Détails"
              className="add-button"
              onClick={() => openPopup("Douae FLIHI")}
            >
              <i className="bx bx-plus-circle"></i>
            </button>
        </div>
        <div className="card">
          <div id="borderceo">
            <div className="card-img" id="ceo"></div>
          </div>
          <h5 className="card-title">Omar TOUIL</h5>
          <p className="p-ceo">{Adn.role[1]}</p>
          <button
            title="Détails"
            className="add-button"
            onClick={() => openPopup("Omar TOUIL")}
            >
            <i className="bx bx-plus-circle ceo"></i>
          </button>
        </div>
        <div className="card">
          <div id="borderdesign">
            <div className="card-img" id="design"></div>
          </div>
          <h5 className="card-title">Sohaib FLIHI</h5>
          <p className="p">{Adn.role[2]}</p>
          <button
            title="Détails"
            className="add-button"
            onClick={() => openPopup("Sohaib FLIHI")}
            >
            <i className="bx bx-plus-circle"></i>
          </button>
        </div>
      </div>
      <Popup trigger={btnPopup} setTrigger={setBtnPopup} name={name}>
        My pop up
      </Popup>
    </>
  );
};

export default Adn;
