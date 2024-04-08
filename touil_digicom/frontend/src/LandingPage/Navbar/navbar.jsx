import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar({onSwitchLang}) {

  const [toggleMenu, setToggleMenu] = useState(false);

  const [lang, setLang] = useState("FR");
  const toggleLanguage = () => {
    setLang(lang === 'FR' ? 'MR' : 'FR');
  };

  onSwitchLang(lang);


  useEffect(() => {
    const handleResize = () => {
      setToggleMenu(window.innerWidth < 644 ? false : true);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Fragment>
      <div className={toggleMenu ? "parentNavbar" : "parentNavbarMenu"}>
        <ul className="ulBrandLogo">
          <Link to="/">
            <li>
              <a>
                <img
                  src="assets/Logo/logo.svg"
                  alt="Touil Digicom"
                  className="brandLogo"
                />
              </a>
            </li>
          </Link>
        </ul>
        <ul className={toggleMenu ? "ulLinks active" : "ulLinks"}>
          <li className="cool-link">
            <Link to="/a-props">
              <a>{lang == 'FR' ? 'À propos' : 'معلومات عنا'}</a>
            </Link>
          </li>
          <li className="cool-link">
            <Link to="/services">
              <a>{lang == 'FR' ? 'Services' : 'خدمات'}</a>
            </Link>
          </li>
          <li className="cool-link">
            <Link to="/faq">
              <a>{lang == 'FR' ? 'FAQ' : 'التعليمات'}</a>
            </Link>
          </li>
          <li className="cool-link">
            <Link to="/contact">
              <a>{lang == 'FR' ? 'Contact' : 'اتصال'}</a>
            </Link>
          </li>
          <div className="parentBtns">
            <Link to="/demand-de-devis">
              <button className="demandBtn">{lang == 'FR' ? 'Demand de devis' : 'طلب الاقتباس'}</button>
            </Link>
            <div className="langParent">
              <button
                className="langBtn"
                onClick={toggleLanguage}
              >
                <img src={lang == 'FR' ? "./assets/Flags/franceFlag.webp" : "./assets/Flags/moroccoFlag.png"} alt="FR" />
              </button>
            </div>
          </div>
        </ul>

        <input
          type="checkbox"
          checked={toggleMenu}
          className="toggleMenu"
          onChange={(e) => setToggleMenu(!toggleMenu)}
        />

        <ul className="burgerMenuUl">
          <button
            className="menuBtn"
            onClick={(e) => setToggleMenu(!toggleMenu)}
          >
            <i className={toggleMenu ? "bx bx-x" : "bx bx-menu"}></i>
          </button>
        </ul>
      </div>
    </Fragment>
  );
}
