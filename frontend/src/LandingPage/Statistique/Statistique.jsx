import React, { useContext, useEffect, useState } from 'react'
import './Statistique.css'
import { LangueContext } from '../../Context/LangueContext'
import { Translate } from './statistiqueTranslate'

export const Statistique = () => {
  const [visible, setvisible] = useState(false)

  useEffect(() => {
    const count = document.querySelectorAll('#count');

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
      let isVisible = false;
      count.forEach(countElement => {
        if (isElementInViewport(countElement)) {
          countElement.classList.add('count--isVisible');
          isVisible = true;
        } else {
          countElement.classList.remove('count--isVisible');
        }
      });

      setvisible(isVisible);
    }

    document.addEventListener("DOMContentLoaded", isCardVisible);
    window.addEventListener('scroll', isCardVisible);
    window.addEventListener('resize', isCardVisible);
  }, [])

  const {langue} = useContext(LangueContext);

  const statistique = Translate.Statistique.find((lang)=>(lang.id == langue ));


  return (
    <div className='statistique' >
    <div className='counter' >
    <span id='count' className={`${visible ? 'count1' : ''}`}>+</span><h3 className='count-title'>{statistique.statique1}</h3>
      </div>
    <div className='counter' >
    <span id='count' className={`${visible ? 'count2' : ''}`}>+</span><h3 className='count-title'>{statistique.statique2}</h3>
      </div>
    <div className='counter' >
    <span id='count' className={`${visible ? 'count3' : ''}`}>+</span><h3 className='count-title'>{statistique.statique3}</h3>
      </div>
    <div className='counter' >
    <span id='count' className={`${visible ? 'count4' : ''}`}></span><h3 className='count-title'>{statistique.statique4}</h3>
      </div>
    
  </div>
  )
}
