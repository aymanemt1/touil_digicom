import React from 'react'
import './Adn.css'
import { Link } from 'react-router-dom'
export const Adn = () => {
  return (
    <div className='adn'>
        <div className='AdnShape'>
          
        <div className="notification" id="ceo">
        <div className='img'></div>
        <div className="content">
          <h2>Omar Touil</h2>
          <p>Ceo & Formateur</p>
        </div>
      </div>

      <div className="notification" id="com">
        <div className='img'></div>
        <div className="content">
          <h2>Douae Frihi</h2>
          <p>Responsable de la communication</p>
        </div>
      </div>

      <div className="notification" id="design">
        <div className='img'></div>
        <div className="content">
          <h2>Sohaib Frihi</h2>
          <p>Videographer/Graphic designer</p>
        </div>
      </div>


        </div>
        <div className='AdnText'  style={{ textDecoration: 'none' }}>
            <h1>Exlorez l'ADN</h1>
            <p>Dans les coulisses de TOUIL DIGICOM, notre équipe représente une expertise diversifiée et un dévouement  permanent envers l'excellence.</p>
            <Link to="/">
              <button className="btnScroll">Voir plus &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" data-name="Right"/></svg></button>
            </Link>
        </div>
        
        </div>
  )
}
