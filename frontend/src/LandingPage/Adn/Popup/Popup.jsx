import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import "./Popup.css";
import { LangueContext } from '../../../Context/LangueContext';
import { Translate } from './popupTranslate';


const Popup = (props) => {
    const {langue}=useContext(LangueContext)
  
    const Team = Translate.Team.find((lang)=>(
       lang.id == langue
     ))

    const profiles = [
        {
            name: 'Douae Frihi',
            role:`${Team.role[0]}`,
            description:`${Team.description_text[0]}`,
            email: 'douaefrihi@gmail.com',
            phone: '+216 53 890 479',
            img: './assets/Adn/Douae\ FH.jpg'

        },
        {
            name: 'Omar Touil',
            role:`${Team.role[1]}`,
            description:`${Team.description_text[1]}`,
            email: 'omartouil@gmail.com',
            phone: '+216 53 890 479',
            img: './assets/Adn/Omar\ TL.jpg'

        },
        {
            name: 'Sohaib Frihi',
            role:`${Team.role[2]}`,
            description: `${Team.description_text[2]}`,
            email: 'sohaibfrihi@gmail.com',
            phone: '+216 53 890 479',
            img: './assets/Adn/Sohaib\ FH.jpg'

        }
    ]
    const profile = profiles.filter(p => p.name == props.name)
    console.log(profile, props.trigger);


    return (
        props.trigger ? (
            <div className='popup'>
                <div className="inner-popup">
                    <div className={`wrapper ${langue === 'ar' ? 'reverseContentPopup' : ''}`}>
                        <div className="left">
                            <img src={profile[0].img} alt="user" width="100" />
                            <h4>{profile[0].name}</h4>

                            <p>{profile[0].role}</p>
                            <div className="social_media">
                                <ul>
                                    <li>
                                        <a href="#">
                                            <FontAwesomeIcon icon={faFacebookF} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <FontAwesomeIcon icon={faTwitter} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <FontAwesomeIcon icon={faInstagram} />
                                        </a>
                                    </li>
                                </ul>
                                </div>
                            </div>
                            <div className="right">
                                <button className='close-btn' onClick={() => props.setTrigger(false)}>&times;</button>
                                <div className="info">
                                    <h3>{Team.info}</h3>
                                    <div className="info_data">
                                        <div className="data">
                                            <h4>Email</h4>
                                            <p>{profile[0].email}</p>
                                        </div>
                                        <div className="data">
                                            <h4>Phone</h4>
                                            <p>{profile[0].phone}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="projects">
                                    <h3>{Team.description}</h3>
                                    <div className="projects_data">

                                        <div className="data">
                                            <p>{profile[0].description}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Social Media Links */}
                            </div>
                        </div>
                    </div>
                </div>
                ) : null


                );
}

                export default Popup;
