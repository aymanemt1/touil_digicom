import React, { useContext, useState } from 'react';
import './Adn.css';
import { Link } from 'react-router-dom';
import Popup from './Popup/Popup';
import { LangueContext } from '../../Context/LangueContext';
import { Translate } from './adntranslate';

export const Adn = () => {

  const [btnPopup, setBtnPopup] = useState(false);
  const [name, setName]  =useState("")

  const openPopup = (name) => {
    setBtnPopup(true);
    setName(name)
  };

  const {langue}=useContext(LangueContext)
  
  const Adn = Translate.Adn.find((lang)=>(
     lang.id == langue
   ))

  

  return (
    <>
      <div className='AdnContent'>
        <div className='AdnText'>
          <h1 className='h1Adn'>{Adn.title}</h1>
          <p>
            {Adn.text}
          <button className="buttonMore">
   {Adn.btn_text}
  <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
    <path
      clip-rule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
      fill-rule="evenodd"
    ></path>
  </svg>
</button>

          </p>
        </div>
      </div>
      <div className='Team'>
        <h1 className='h1'>{Adn.equipe_title}</h1>
        <div className='card'>
          <div id='bordercom'>
            <div className='card-img' id='com'></div>
          </div>
          <h5 className='card-title'>Douae Frihi</h5>
          <p className='p'> {Adn.role[0]}</p>
          <button title="Détails" className="add-button" onClick={()=>openPopup("Douae Frihi")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24">
              <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" fill="none" />
              <path d="M8 12H16" stroke="currentColor" />
              <path d="M12 16V8" stroke="currentColor" />
            </svg>
          </button>
        </div>
        <div className='card'>
          <div id='borderceo'>
            <div className='card-img' id='ceo'></div>
          </div>
          <h5 className='card-title'>Omar Touil</h5>
          <p className='p'>{Adn.role[1]}</p>
          <button title="Détails" className="add-button" onClick={()=>openPopup("Omar Touil")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24">
              <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" fill="none" />
              <path d="M8 12H16" stroke="currentColor" />
              <path d="M12 16V8" stroke="currentColor" />
            </svg>
          </button>
        </div>
        <div className='card'>
          <div id='borderdesign'>
            <div className='card-img' id='design'></div>
          </div>
          <h5 className='card-title'>Sohaib Frihi</h5>
          <p className='p'>{Adn.role[2]}</p>
          <button title="Détails" className="add-button" onClick={()=>openPopup("Sohaib Frihi")}>

            <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24">
              <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" fill="none" />
              <path d="M8 12H16" stroke="currentColor" />
              <path d="M12 16V8" stroke="currentColor" />
            </svg>
          </button>
        </div>
      </div>
      <Popup trigger={btnPopup} setTrigger={setBtnPopup} name={name}>My pop up </Popup>



    </>
  );
}

export default Adn;
