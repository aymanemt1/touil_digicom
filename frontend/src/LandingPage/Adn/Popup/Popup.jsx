import React, { useContext, useState, useEffect } from "react";
import "./Popup.css";
import { LangueContext } from "../../../Context/LangueContext";
import { Translate } from "./popupTranslate";

const Popup = (props) => {
  const { langue } = useContext(LangueContext);

  const Team = Translate.Team.find((lang) => lang.id === langue);

  const profiles = [
    {
      name: "Douae FLIHI",
      role: `${Team.role[0]}`,
      description: `${Team.description_text[0]}`,
      email: "douaeflihi@gmail.com",
      phone: "+2126 20 576 812",
      img: "./assets/Adn/Douae FH.jpg",
      facebook: "https://www.facebook.com/douae.fh.94",
      instagram: "https://www.instagram.com/douae__flh/",
      linkedin: "www.linkedin.com/in/douae-flihi-99152a305",
      whatsapp: "",
    },
    {
      name: "Omar TOUIL",
      role: `${Team.role[1]}`,
      description: `${Team.description_text[1]}`,
      email: "to.omar.touil@gmail.com",
      phone: "+2126 28 794 501",
      img: "./assets/Adn/Omar TL.jpg",
      facebook: "https://www.facebook.com/touil.omar.92",
      instagram: "https://www.instagram.com/omar.touile/",
      linkedin: "https://www.linkedin.com/in/omar-touil-2402941b5/",
      whatsapp: "https://wa.me/212628794501",
    },
    {
      name: "Sohaib FLIHI",
      role: `${Team.role[2]}`,
      description: `${Team.description_text[2]}`,
      email: "sohaibfh12@gmail.com",
      phone: "",
      img: "assets/Adn/Sohaib FH.jpg",
      facebook: "",
      instagram: "",
      linkedin: "www.linkedin.com/in/sohaib-flihi-118801305",
      whatsapp: "",
    },
  ];

  const profile = profiles.find((p) => p.name === props.name);
  const [isBodyOverflowHidden, setBodyOverflowHidden] = useState(false);

  useEffect(() => {
    if (props.trigger) {
      document.body.style.overflow = "hidden";
      setBodyOverflowHidden(true);
    } else {
      document.body.style.overflow = "";
      setBodyOverflowHidden(false);
    }

    return () => {
      document.body.style.overflow = "";
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
                <div className="infoPopUpCard">
                  <h4>{profile.name}</h4>
                  <p>{profile.role}</p>
                  <div className="social_media">
                    <ul>
                      {profile.facebook && (
                        <li>
                          <a href={profile.facebook} target="_blank">
                            <i className="bx bxl-facebook-circle"></i>
                          </a>
                        </li>
                      )}
                      {profile.linkedin && (
                        <li>
                          <a href={profile.linkedin} target="_blank">
                            <i className="bx bxl-linkedin"></i>
                          </a>
                        </li>
                      )}
                      {profile.instagram && (
                        <li>
                          <a href={profile.instagram} target="_blank">
                            <i className="bx bxl-instagram"></i>
                          </a>
                        </li>
                      )}
                      {profile.whatsapp && (
                        <li>
                          <a href={profile.whatsapp} target="_blank">
                            <i className="bx bxl-whatsapp"></i>
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="right">
                <button
                  className="close-btn"
                  onClick={() => props.setTrigger(false)}
                >
                  &times;
                </button>
                <div className={langue == "fr" ? "info" : "info infoAr"}>
                  <h3>{Team.info}</h3>
                  <div className="info_data">
                    {
                      profile.email && (
                        <div className="data">
                        <h4>
                          <i className="bx bxs-envelope"></i> Email
                        </h4>
                        <p>{profile.email}</p>
                      </div>
                      )
                    }
                    {
                      profile.phone && (
                        <div className="data">
                        <h4>
                          <i className="bx bxs-phone"></i> Phone
                        </h4>
                        <p>{profile.phone}</p>
                      </div>
                      )
                    }

                  </div>
                </div>
                <div
                  className={
                    langue == "fr" ? "projects" : "projects projectsAr"
                  }
                >
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
