import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { Link as ScrollLink } from "react-scroll";

export const NavDropdown = ({ link }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <li
      key={link.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {link.dropdown ? (
        <div>
          <Link className="cool-link" to={link.to}>
            {link.text}
            <i className="bx bxs-down-arrow arrow"></i>
          </Link>

          {isDropdownOpen && (
            <ul>
              {link.dropdown.map((dropdownItem) => (
                <li className="items" key={dropdownItem.id}>
                  <Link className="cool-link-child" to={dropdownItem.to}>
                    {dropdownItem.text}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : link.id === 1 ? (
        location.pathname === "/blogs" || location.pathname === "/contact" ? (
          <Link id={link.id} className="cool-link" to={link.to}>
            {link.text}
          </Link>
        ) : (
          <ScrollLink
            className="scrollLink cool-link"
            to="adn"
            smooth={true}
            duration={500}
          >
            {link.text}
          </ScrollLink>
        )
      ) : link.id === 4 ? (
        location.pathname === "/blogs" || location.pathname === "/contact" ? (
          <Link id={link.id} className="cool-link" to={link.to}>
            {link.text}
          </Link>
        ) : (
          <ScrollLink
            className="scrollLink cool-link"
            to="faq"
            smooth={true}
            duration={2000}
          >
            {link.text}
          </ScrollLink>
        )
      ) : (
        <Link id={link.id} className="cool-link" to={link.to}>
          {link.text}
        </Link>
      )}
    </li>
  );
};
