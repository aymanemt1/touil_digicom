import React, { useContext } from 'react'
import './HowItWorks.css'
import { Translate } from './HowItworksTrasnlate'
import { LangueContext } from '../../Context/LangueContext'

export const HowItWorks = () => {

    const {langue}=useContext(LangueContext)
  
    const HowItWorks = Translate.HowItWorks.find((lang)=>(
       lang.id == langue
     ))

  
    return (

        <div className="coomment">
            <div className='entite'>
                <div>

                    <img src='assets/WhyUs/how1.png' className='image-comment' />
                </div>

                <div className='topEtapes'>

                    <h2 className='h1LandingPage'>{HowItWorks.title}</h2>


                    <div id='etape' className='etape1'>
                        <span className='number-etape'>01.</span>
                        <h3 className='title-etape'>{HowItWorks.blogs.blog1} </h3>
                    </div>


                    <div id='etape' className='etape2'>
                        <span className='number-etape'>02.</span>
                        <h3 className='title-etape'>{HowItWorks.blogs.blog2}</h3>
                    </div>
                </div>


            </div>

            <div className='bottomEtapes'>

                <div className='etapes'>
                    <div id='etape' className='etape3'>
                        <span className='number-etape'>03.</span>
                        <h3 className='title-etape'>{HowItWorks.blogs.blog3}</h3>
                    </div>

                    <div id='etape' className='etape4'>
                        <span className='number-etape'>04.</span>
                        <h3 className='title-etape'>{HowItWorks.blogs.blog4}</h3>
                    </div>

                    <div id='etape' className='etape5'>
                        <span className='number-etape'>05.</span>
                        <h3 className='title-etape'>{HowItWorks.blogs.blog5} </h3>
                    </div>
                </div>
                <div>  <img src='assets/WhyUs/how2.png' className='image-comment' id='Comment-image2' /></div>
            </div>

            <div className='TextHow'>
                <p>
                    {HowItWorks.sous_title}
                </p>
                <button className="btnToBlogs">{HowItWorks.btn}</button>
            </div>
        </div>


    )
}
