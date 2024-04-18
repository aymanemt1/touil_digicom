import React from 'react'
import './FormationCard.css'

export const FormationCard = () => {
    return (
        <div className='detail-bottom'>

            <div className='card-formation'>
                <div className='card-image'>
                    <img className='cardformation-img' src='/assets/DetailService/service1-img1.jpg' alt='service-Image' />
                </div>
                <div className='card-content'>
                    <div className="titleformation">
                        <h2>Gestion de campagnes publicitaires en ligne.</h2>
                    </div>
                    <div className="infoOwner">
                        <div className="ownerformation">
                            <img src="/assets/Team/Pic/Omar TL.jpg" />
                            <h6>Mohammed Achkar</h6>
                        </div>
                        <div className="date">
                            <h6>2023, dec 25 - 18pm</h6>
                        </div>
                    </div>
                    <div className="descriptionformation">
                        <div className="line"></div>
                        <p>
                            Gestion de campagnes publicitaires en ligne Gestion de campagnes publicitaires en ligne.
                            Gestion de campagnes publicitaires en ligne.
                            Gestion de campagnes publicitaires en ligne.
                        </p>
                    </div>
                    <div className='buttons-card'>
                        <button className='btnModels'>Choisir les modules</button>
                        <button className='btnReserve'>Reserve</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
