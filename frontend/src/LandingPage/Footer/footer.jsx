import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer" data-aos="fade-up" >
      <div className="footer-content">
        <div className="divFooterBtnDev">
        <img src="/assets/Logo/logo3.png" className="footer-logo" alt="" />
        <Link to='/team-dev'>
          <button>
          <i className='bx bx-link-external' ></i>
          L'équipe à l'origine de ce site</button>
        </Link>
        </div>
        <p><i className='bx bx-current-location' ></i> Boulevard Mohammed V, Technopark Tangier 90000</p>
        <div className="footer-socialmedia">
          <a
            href="https://web.facebook.com/touil.digicom?locale=fr_FR"
            target="_blanka"
          >
            <i className="bx bxl-facebook"></i>
          </a>
          <a href="https://www.instagram.com/touil.digicom/" target="_blanka">
            <i className="bx bxl-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com/company/touil-digicom"
            target="_blanka"
          >
            <i className="bx bxl-linkedin"></i>
          </a>
          <a href="https://www.youtube.com/@TOUILDIGICOM" target="_blanka">
            <i className="bx bxl-youtube"></i>
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        © {new Date().getFullYear()} TOUIL DIGICOM. All Rights Reserved
      </div>
    </div>
  );
};
