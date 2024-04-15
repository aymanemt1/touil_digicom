import React, { useEffect } from 'react'
import './References.css'
export const References = () => {
    useEffect(()=>{
        const refs = document.querySelectorAll('#ref');

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function isCardVisible() {
    refs.forEach( ref => {
    isElementInViewport(ref) ? ref.classList.add('card--isVisible') : ref.classList.remove('card--isVisible');
  })
}

document.addEventListener("DOMContentLoaded", isCardVisible);
window.addEventListener('scroll', isCardVisible);
window.addEventListener('resize', isCardVisible);
    },[])


  return (
    <div className='references'>
        <div className='references-images'>
         <div id="ref"><img className='ref3' src="assets/refeCTD/jamarek.png" alt="" /></div>
         <div id="ref"><img className='ref2' src="assets/refeCTD/IME.png" alt="" /></div>
         <div id="ref"><img className='ref5' src="assets/refeCTD/LOGO.png" alt="" /></div>
         <div id="ref"><img className='ref6' src="assets/refeCTD/um5.webp" alt="" /></div>
         <div id="ref"><img className='ref4' src="assets/refeCTD/logo-tijara.png" alt="" /></div>
         <div id="ref"><img className='ref1' src="assets/refeCTD/bewize-logo-1.webp" alt="" /></div>
        </div>
    </div>
  )
}
