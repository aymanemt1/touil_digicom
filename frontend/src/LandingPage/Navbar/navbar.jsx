import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { LangueContext } from "../../Context/LangueContext";
import { Translate } from "./NavbarTranslate";
import { NavDropdown } from "./NavDropdown";
import { Link as ScrollLink } from "react-scroll";

export default function Navbar({ link }) {
  const [toggleMenu, setToggleMenu] = useState(false);

  function handleClickMenuOff() {
    setToggleMenu(false);
  }

  const { langue, setlangue } = useContext(LangueContext);

  const Navbar = Translate.Navbar.find((lang) => lang.id == langue);

  const toggleLanguage = () => {
    setlangue(langue === "fr" ? "ar" : "fr");
  };

  const navLinks = [
    { id: 1, to: "/", text: `${Navbar.link1}` },
    {
      id: 2,
      text: `${Navbar.link2.label}`,
      dropdown: [
        { id: 21, to: "/service/1", text: `${Navbar.link2.dropdown[0]}` },
        { id: 22, to: "/service/2", text: `${Navbar.link2.dropdown[1]}` },
        { id: 22, to: "/service/3", text: `${Navbar.link2.dropdown[2]}` },
        { id: 22, to: "/service/4", text: `${Navbar.link2.dropdown[3]}` },
      ],
    },
    { id: 3, to: "/blogs", text: `${Navbar.link3}` },
    { id: 4, to: "/", text: `${Navbar.link4}` },
    { id: 5, to: "/contact", text: `${Navbar.link5}` },
  ];

  const renderNavLinks = navLinks.map((link) => (
    <NavDropdown
      toggleMenu={toggleMenu}
      setToggleMenu={setToggleMenu}
      link={link}
    />
  ));

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

  const location = useLocation();

  const isSpecialPath =
    location.pathname === "/blogs" || location.pathname === "/contact";

  return (
    <Fragment>
      <nav className={toggleMenu ? "parentNavbar" : "parentNavbarMenu"}>
        <ul className="ulBrandLogo">
          <Link to="/" id="logo">
            <li>
              <img
                src="/assets/Logo/logoLandige.png"
                alt="Touil Digicom"
                className="brandLogo"
                onClick={window.innerWidth < 744 ? handleClickMenuOff : null}
              />
            </li>
          </Link>
        </ul>
        <ul className={toggleMenu ? "ulLinks active" : "ulLinks"}>
          {renderNavLinks}
          <div className="parentBtns">
            {isSpecialPath ? (
              <Link
                to="/"
                onClick={window.innerWidth < 744 ? handleClickMenuOff : null}
              >
                <button className="demandBtn">{Navbar.btn_devis}</button>
              </Link>
            ) : (
              <ScrollLink
                to="devis"
                smooth={true}
                duration={2200}
                onClick={window.innerWidth < 744 ? handleClickMenuOff : null}
              >
                <button className="demandBtn">{Navbar.btn_devis}</button>
              </ScrollLink>
            )}
            <div className="langParent">
              <button
                className="langBtn"
                onClick={() => {
                  toggleLanguage();
                  if (window.innerWidth < 744) {
                    handleClickMenuOff();
                  }
                }}
              >
                <img className="flag" src={Navbar.flag} alt="FR" />
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
      </nav>
    </Fragment>
  );
}
