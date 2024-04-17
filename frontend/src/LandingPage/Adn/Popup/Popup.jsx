import React, { useContext, useState, useEffect } from "react";
import "./Popup.css";
import { LangueContext } from "../../../Context/LangueContext";
import { Translate } from "./popupTranslate";

const Popup = (props) => {
  const { langue } = useContext(LangueContext);

  const Team = Translate.Team.find((lang) => lang.id === langue);

  const profiles = [
    {
      name: "Douae Frihi",
      role: `${Team.role[0]}`,
      description: `${Team.description_text[0]}`,
      email: "douaefrihi@gmail.com",
      phone: "+216 53 890 479",
      img: "./assets/Adn/Douae FH.jpg",
    },
    {
      name: "Omar Touil",
      role: `${Team.role[1]}`,
      description: `${Team.description_text[1]}`,
      email: "omartouil@gmail.com",
      phone: "+216 53 890 479",
      img: "./assets/Adn/Omar TL.jpg",
    },
    {
      name: "Sohaib Frihi",
      role: `${Team.role[2]}`,
      description: `${Team.description_text[2]}`,
      email: "sohaibfrihi@gmail.com",
      phone: "+216 53 890 479",
      img: "assets/Adn/Sohaib FH.jpg",
    },
  ];

  const profile = profiles.find((p) => p.name === props.name);
  const [isBodyOverflowHidden, setBodyOverflowHidden] = useState(false);

  useEffect(() => {
    if (props.trigger) {
      document.body.style.overflow = 'hidden';
      setBodyOverflowHidden(true);
    } else {
      document.body.style.overflow = ''; 
      setBodyOverflowHidden(false);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [props.trigger]);

  return (
    <div>
      {props.trigger && (
        <div className="popup">
          <div className="inner-popup">
            <div
              className={`wrapper ${
                langue === "ar" ? "reverseContentPopup" : ""
              }`}
            >
              <div className="left">
                <img src={profile.img} alt="user" width="100" />
                <h4>{profile.name}</h4>

                <p>{profile.role}</p>
                <div className="social_media">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="bx bxl-facebook-circle"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bx bxl-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="bx bxl-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="right">
                <button
                  className="close-btn"
                  onClick={() => props.setTrigger(false)}
                >
                  &times;
                </button>
                <div className="info">
                  <h3>{Team.info}</h3>
                  <div className="info_data">
                    <div className="data">
                      <h4>
                        <i className="bx bxs-envelope"></i> Email
                      </h4>
                      <p>{profile.email}</p>
                    </div>
                    <div className="data">
                      <h4>
                        <i className="bx bxs-phone"></i> Phone
                      </h4>
                      <p>{profile.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="projects">
                  <h3>{Team.description}</h3>
                  <div className="projects_data">
                    <div className="data">
                      <p>{profile.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
