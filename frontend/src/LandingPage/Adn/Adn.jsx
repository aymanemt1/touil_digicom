import React, { useState } from 'react';
import './Adn.css';
import { Link } from 'react-router-dom';
import Popup from './Popup';

export const Adn = () => {

  const [btnPopup, setBtnPopup] = useState(false);
  const [name, setName]  =useState("")

  const openPopup = (name) => {
    setBtnPopup(true);
    setName(name)
  };
  

  return (
    <>
      <div className='AdnContent'>
        <div className='AdnText'>
          <h1 className='h1Adn'>Explorez l'ADN</h1>
          <p>Dans les coulisses de TOUIL DIGICOM, notre équipe représente une expertise diversifiée et un dévouement permanent envers l'excellence.
            <Link to="/"><button className="btnScroll">Voir plus &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" data-name="Right" /></svg></button></Link>
          </p>
        </div>
      </div>
      <div className='Team'>
        <h1 className='h1'>Explorez notre équipe</h1>
        <div className='card'>
          <div id='bordercom'>
            <div className='img' id='com'></div>
          </div>
          <h5 className='card-title'>Douae Frihi</h5>
          <p className='p'>Responsable de la communication</p>
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
            <div className='img' id='ceo'></div>
          </div>
          <h5 className='card-title'>Omar Touil</h5>
          <p className='p'>CEO & Fondateur</p>
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
            <div className='img' id='design'></div>
          </div>
          <h5 className='card-title'>Sohaib Frihi</h5>
          <p className='p'>Videographer/ Graphic  Designer</p>
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
