import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import "./Popup.css";


const Popup = (props) => {
    const profiles = [
        {
            name: 'Douae Frihi',
            role: 'Responsable de la communication',
            description: 'Douae FLIHI, notre responsable de communication, apporte une touche de créativité et de stratégie à chaque projet, assurant une communication fluide et efficace avec nos clients.',
            email: 'douaefrihi@gmail.com',
            phone: '+216 53 890 479',
            img: './assets/Adn/Douae\ FH.jpg'

        },
        {
            name: 'Omar Touil',
            role: 'CEO-fondateur  @touil.digicom\  Consultant Formateur @kafaat.by.touildigicom',
            description: 'un leader expert doté d\'un master spécialisé en communication des organisations, qualité, médias et territoires, notre agence est guidée par une vision stratégique et une passion pour l\'innovation. En tant que spécialiste en communication et relation publique, Omar apporte une expertise inégalée pour guider notre équipe vers le succès.',
            email: 'omartouil@gmail.com',
            phone: '+216 53 890 479',
            img: './assets/Adn/Omar\ TL.jpg'

        },
        {
            name: 'Sohaib Frihi',
            role: 'Videographer & Grahic designer',
            description: 'vidéographe et graphiste de talent, nous donnons vie à des idées avec des images et des designs captivants, ajoutant une dimension visuelle puissante à notre travail.            ',
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
                    <div className="wrapper">
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
                                    <h3>Information</h3>
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
                                    <h3>Description</h3>
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
