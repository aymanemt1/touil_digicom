import React from 'react'
import './Contact.css'
import Navbar from '../Navbar/navbar'
import { Footer } from '../Footer/footer'
export const Contact = () => {
  return (
    <div className='contactParent'>
      <div className='contact'>

        <div className='contact-header'>
          <div className='contact-title'>
            <p> -Contact us</p>
            <h2>Nous aimerions avoir de vos nouvelles</h2>
          </div>
          <div className='contact-text'>
            Nous sommes là pour saisir vos aspirations et vos objectifs, afin de vous offrir des solutions qui favorisent votre développement et votre bien-être. Si vous souhaitez explorer en détail vos rêves les plus ambitieux, vous êtes au bon endroit !
          </div>
        </div>

        <div className='contact-main'>
          <div className='contact-info'>
            <div className='adress'>
            <div id='contact-icon'>
            <i className='bx bx-current-location'></i>
            </div>
             <div id='contact-info'> <h3>Adress</h3>
              <p >Boulevard Mohammed V, Technopark Tangier 90000 </p></div>
            </div>
            <div className='telephone'>
            <div id='contact-icon'>
            <i class='bx bxs-phone-call' ></i>
              </div>
            <div id='contact-info'>
              <h3>Téléphone</h3>
              <p>212 628.79.45.01 - 212 711-172764</p>
              </div>
            </div>
            <div className='e-mail'>
            <div id='contact-icon'>
            <i className='bx bxs-envelope'></i>
            </div>
            <div id='contact-info'>
              <h3>E-mail</h3>
              <p>contact@touildigicom.ma</p>
            </div>
            </div>
          </div>
          <div className='contact-map'>
            <div className='contact-forms'>
              <h1 >Contactez-nous pour toute question</h1>
              <div className="wave-group">
                <input required="" name='nom' type="text" placeholder='Nom' className="input-contact" />
                <input required="" name='prenom' type="text" placeholder='Prenom' className="input-contact" />
                <input required="" name='email' type="text" placeholder='E-mail' className="input-contact" />
                <input required="" name='message' type="text" placeholder='Votre Message' className="input-contact" />
                <div>

                  <button className="contact-button" role="button">Envoyer </button>
                </div>
              </div>
            </div>
            <div className='google-map'>
              <iframe className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.9774884554645!2d-5.805697525780093!3d35.775929324768725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0c7f580f56224f%3A0x10633cdbe9d95d5b!2sTechnopark!5e0!3m2!1sen!2sma!4v1713175648227!5m2!1sen!2sma"
               
                allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
