import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'

export const Navbar = () => {

  return (
    <header>
    <nav class="FixedNav">
      <ul id="navbar">
        <li><a href="#" >About</a></li>
        <li><a href="#" >Service</a></li>
        <li><a href="#"><img src='assets/logoTouil.png' /></a></li>
        <li><a href="#">Service</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </nav>
  </header>
  
  )
}
