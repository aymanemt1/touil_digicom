import React, { useState } from 'react'
import './Navbar.css'

export const Navbar = () => {
  const {langue,setlangue}=useState("")
  
  const [showMenu, setShowMenu] = useState(false);
const [showMenuIcon, setshowMenuIcon] = useState(false);

const toggleMenu = () => {
  setShowMenu(!showMenu);
};
const toggleIcon = () => {
  setshowMenuIcon(!showMenuIcon);
};

   
  const handlLangue =(event)=>{
      event.preventDefault();
  }

  return (
    <header>
      <ul id="navbar">
      
    <div className='logo'>
    <li><a href="#"><img src='assets/Logo/logo.svg' /></a></li>
    </div>

    <div id='nav'>

       <div id='links' className={showMenu ? 'show' : ''}>
       <li><a href="#" >A props</a></li>
       <li><a href="#">Services</a></li>
        <li><a href="#">FAQ</a></li>
        <li><a href="#">Contact</a></li>
       </div>
      
      {/* Hamburge */}
       <input onClick={toggleMenu} type="checkbox" id="checkbox2" className="checkbox2 visuallyHidden" />
        <label for="checkbox2">
            <div class="hamburger hamburger2">
                <span className="bar bar1"></span>
                <span className="bar bar2"></span>
                <span className="bar bar3"></span>
                <span className="bar bar4"></span>
            </div>
        </label>

       <div id='right'  className={showMenu ? 'show' : ''}>
    <button className="button" role="button">Demander un devis</button>

       <form onSubmit={handlLangue} >
      <select className="custom-select" onChange={(e)=>setlangue(e.target.value)} id='lang' value={langue}>
        <option value="FR" className='option-fr'>
        </option>
        <option value="AR" className='option-ar'>
          Ar
        </option>
      </select>
    </form>
       </div>

    </div>

      </ul>


  </header>
  
  )
}
