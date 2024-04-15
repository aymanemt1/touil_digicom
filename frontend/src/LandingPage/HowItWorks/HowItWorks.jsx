import React from 'react'
import './HowItWorks.css'

export const HowItWorks = () => {
    return (

        <div className="coomment">
            <div className='entite'>
               <div>
               <img src='assets/WhyUs/how1.png' className='image-comment' />
               </div>
                <div className='topEtapes'>

                    <h2>COMMENT ÇA MARCHE ?</h2>


                    <div id='etape' className='etape1'>
                        <span className='number-etape'>01.</span>
                        <h3 className='title-etape'>Analyse des besoins du client et planification stratégique</h3>
                    </div>

                    <div id='etape' className='etape2'>
                        <span className='number-etape'>02.</span>
                        <h3 className='title-etape'>Conception et création de contenu</h3>
                    </div>
                </div>


            </div>

                <div className='bottomEtapes'>

                   <div className='etapes'>
                   <div id='etape' className='etape3'>
                        <span className='number-etape'>03.</span>
                        <h3 className='title-etape'>Mise en œuvre et exécution des campagnes</h3>
                    </div>

                    <div id='etape' className='etape4'>
                        <span className='number-etape'>04.</span>
                        <h3 className='title-etape'>Évaluation des performances et analyse des résultats</h3>
                    </div>

                    <div id='etape' className='etape5'>
                        <span className='number-etape'>05.</span>
                        <h3 className='title-etape'>Communication avec le client et gestion de la relation </h3>
                    </div>
                   </div>
                  <div>  <img src='assets/WhyUs/how2.png' className='image-comment' id='Comment-image2' /></div>
                </div>
            </div>


    )
}
