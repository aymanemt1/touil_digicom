import React, { useState } from 'react'
import './Navbar.css'

export const Navbar = () => {
  const {langue,setlangue}=useState("")
  
   
  const handlLangue =(event)=>{
      event.preventDefault();
  }

  return (
    <header>
    <nav class="FixedNav">
      <ul id="navbar">
      
    <div className='logo'>
    <li><a href="#"><img src='assets/Logo/logo1.png' /></a></li>
    </div>
       <div className='links'>
       <li><a href="#" >About</a></li>
        <li><a href="#" >Service</a></li>
        <li><a href="#">Service</a></li>
        <li><a href="#">About</a></li>

       </div>
       <div className='right'>
       <form onSubmit={handlLangue} >
      <select onChange={(e)=>setlangue(e.target.value)} id='lang' value={langue}>
        <option value="FR" className='option-fr'>
  <img src='assets/Flags/france.png' width="10px" />
        </option>
        <option value="AR" className='option-ar'>
          Ar
        </option>
      </select>
    </form>
    <button class="button" role="button">Demander un devis</button>
       </div>
      </ul>

    </nav>
  </header>
  
  )
}
