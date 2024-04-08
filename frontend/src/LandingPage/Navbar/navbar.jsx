import { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { LangueContext } from "../../Context/LangueContext";
import { Translate } from "./NavbarTranslate";
import { NavDropdown } from "./NavDropdown";

export default function Navbar({link}) {

  const [toggleMenu, setToggleMenu] = useState(false);

  const {langue,setlangue}=useContext(LangueContext)
  
    const Navbar = Translate.Navbar.find((lang)=>(
       lang.id == langue
     ))

  const toggleLanguage = () => {
    setlangue(langue === 'fr' ? 'ar' : 'fr');
  };

  const navLinks = [
    { id: 1, to: '/a-props', text: `${Navbar.link1}` },
    { 
      id: 2, 
      text: `${Navbar.link2.label}`,
      dropdown: [
        { id: 21, to: '/services/service1', text: 'Service 1' },
        { id: 22, to: '/services/service2', text: 'Service 2' },
      ]
    },
    { id: 3, to: '/faq', text: `${Navbar.link3}` },
    { id: 4, to: '/contact', text: `${Navbar.link4}` },
  ];
  
    const renderNavLinks = navLinks.map((link) => (
      <NavDropdown link={link} />
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

  return (
    <Fragment>
      <div className={toggleMenu ? "parentNavbar" : "parentNavbarMenu"}>
        <ul className="ulBrandLogo">
          <Link to="/">
            <li>
              <a>
                <img
                  src="assets/Logo/logo4.png"
                  alt="Touil Digicom"
                  className="brandLogo"
                />
              </a>
            </li>
          </Link>
        </ul>
        <ul className={toggleMenu ? "ulLinks active" : "ulLinks"}>
          {renderNavLinks}
          <div className="parentBtns">
            <Link to="/demand-de-devis">
              <button className="demandBtn">{Navbar.btn_devis}</button>
            </Link>
            <div className="langParent">
              <button
                className="langBtn"
                onClick={toggleLanguage}
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
      </div>
    </Fragment>
  );
}
