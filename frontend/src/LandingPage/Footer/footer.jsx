import React from 'react'
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram} from '@fortawesome/free-brands-svg-icons'
export const Footer = () => {
  return (
    <div className='footer'>
  <div className='footer-content'>
      <img src="assets/Logo/logo3.png" className='footer-logo' alt="" />
      <div className='footer-socialmedia'>
      <FontAwesomeIcon className='footer-icon' icon={faFacebookF} />
      <FontAwesomeIcon className='footer-icon' icon={faInstagram} />
      </div>
  </div>
      <div className='footer-copyright'>
      © 2024 TOUIL DIGICOM. All Rights Reserved 
      </div>
    </div>
  )
}
