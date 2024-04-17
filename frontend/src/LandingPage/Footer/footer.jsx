import React from 'react'
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faLinkedin, faYoutube} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
export const Footer = () => {
  return (
    <div className='footer'>
  <div className='footer-content'>
      <img src="assets/Logo/logo3.png" className='footer-logo' alt="" />
     <p >
Boulevard Mohammed V, Technopark Tangier 90000
      </p>
      <div className='footer-socialmedia'>
      <a href="https://web.facebook.com/touil.digicom?locale=fr_FR">
  <FontAwesomeIcon className='footer-icon' icon={faFacebookF} />
</a>
<a href="https://www.youtube.com/@TOUILDIGICOM">
  <FontAwesomeIcon className='footer-icon' id='ytb-icon' icon={faYoutube} />
</a>
<a href="https://www.linkedin.com/company/touil-digicom">
  <FontAwesomeIcon className='footer-icon' id='linkdein-icon' icon={faLinkedin} />
</a>
<a href="https://www.instagram.com/touil.digicom/">
  <FontAwesomeIcon className='footer-icon' icon={faInstagram} />
</a>

      </div>
  </div>
      <div className='footer-copyright'>
      © 2024 TOUIL DIGICOM. All Rights Reserved 
      </div>
    </div>
  )
}
