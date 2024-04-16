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
            <i className='bx bx-plus-circle'></i>
          </button>
        </div>
        <div className='card'>
          <div id='borderceo'>
            <div className='card-img' id='ceo'></div>
          </div>
          <h5 className='card-title'>Omar Touil</h5>
          <p className='p-ceo'>{Adn.role[1]}</p>
          <button title="Détails" className="add-button" onClick={()=>openPopup("Omar Touil")}>
          <i className='bx bx-plus-circle ceo'></i>
          </button>
        </div>
        <div className='card'>
          <div id='borderdesign'>
            <div className='card-img' id='design'></div>
          </div>
          <h5 className='card-title'>Sohaib Frihi</h5>
          <p className='p'>{Adn.role[2]}</p>
          <button title="Détails" className="add-button" onClick={()=>openPopup("Sohaib Frihi")}>
          <i className='bx bx-plus-circle'></i>

          </button>
        </div>
      </div>
      <Popup trigger={btnPopup} setTrigger={setBtnPopup} name={name}>My pop up </Popup>

    </>
  );
}

export default Adn;
