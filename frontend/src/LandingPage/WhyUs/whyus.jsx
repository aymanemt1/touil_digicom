

import React, { useContext, useEffect, useState } from 'react'
import './whyus.css'
import { LangueContext } from '../../Context/LangueContext';
import { Translate } from './Whyustranslate';

export const WhyUs = () => {
  useEffect(() => {
    const spaceHolder = document.querySelector('.space-holder');
    const horizontal = document.querySelector('.horizontal');
    spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;

    function calcDynamicHeight(ref) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const objectWidth = ref.scrollWidth;
      return objectWidth - vw + vh + 150;
    }

    window.addEventListener('scroll', () => {
      const sticky = document.querySelector('.sticky');
      horizontal.style.transform = `translateX(-${sticky.offsetTop}px)`;
    });

    window.addEventListener('resize', () => {
      spaceHolder.style.height = `${calcDynamicHeight(horizontal)}px`;
    });
  }, [])



  const { langue } = useContext(LangueContext)

  const WhyUs = Translate.WhyUs.find((lang) => (
    lang.id == langue
  ))

  
  return (

    <>

      <section className="container">
        <div className="space-holder">
          <div className="sticky">
            <div className="horizontal">
              <section  className="cards">
                <article className="sample-card">
                  <div className='section-1'>
                    {/* <img src="assets/WhyUs/team-pic1.png" width="550px" alt="" /> */}
                  </div>
                </article>

                <article className="sample-card">
                  <div className='section-2'>
                    <h1>{WhyUs.section1_title}</h1>
                    <p>{WhyUs.section1_text}</p>
                  </div>
                </article>
                <article className="sample-card">
                  <div className='section-3'>
                      <div className='Parentellipse'>
                        <div className="ellipses-container">
                         <img src="assets/WhyUs/icon1.svg" className='img' alt="" />
                          <div className="ellipses ellipses__outer--thin">

                            <div className="ellipses ellipses__orbit"></div>
                          </div>
                          <div className="ellipses ellipses__outer--thick"></div>
                        </div>
                        <h2 className='title'>RAPIDITÉ</h2>
                      </div>
                    <div className='Parentellipse2'>
                      <div className="ellipses-container">
                      <img src="assets/WhyUs/icon2.svg" className='img' alt="" />
                        <div className="ellipses ellipses__outer--thin">

                          <div className="ellipses ellipses__orbit"></div>
                        </div>
                        <div className="ellipses ellipses__outer--thick"></div>
                      </div>
                      <h2 className='title'>RÉPONSE EN TEMPS RÉEL</h2>
                    </div>
                  </div>
                </article>
                <article className="sample-card">
                  <div className='section-4'>
                    <div>
                      <div className='Parentellipse3'>
                        <div className="ellipses-container">
                        <img src="assets/WhyUs/icon3.svg" className='img' alt="" />
                          <div className="ellipses ellipses__outer--thin">

                            <div className="ellipses ellipses__orbit"></div>
                          </div>
                          <div className="ellipses ellipses__outer--thick"></div>
                        </div>
                        <h2 className='title'>EFFICACITÉ</h2>
                      </div>
                    </div>
                    <div className='Parentellipse4'>
                      <div className="ellipses-container">
                      <img src="assets/WhyUs/icon4.svg" className='img' alt="" />
                        <div className="ellipses ellipses__outer--thin">

                          <div className="ellipses ellipses__orbit"></div>
                        </div>
                        <div className="ellipses ellipses__outer--thick"></div>
                      </div>
                      <h2 className='title'>FLEXIBILITÉ</h2>
                    </div>
                  </div>

                </article>
                <article className="sample-card">
                  <div className='section-5'>
                <div className='leftCounter'>
                <div className='counter1'>
                <h1> <span className='count'>59+</span> Clients Nous Font Confiance</h1>
                </div>
                <div className='counter2'>
                <h1> <span className='count'>15+</span>Partenaires Créatifs</h1>
                </div>
                </div>

                <div className='rightCounter'>
                <div className='counter3'>
                <h1> <span className='count'>78+</span> Litres de cafés consommés</h1>
                </div>
                <div className='counter4'>
                <h1> <span className='count'>1112</span>  Fous rires</h1>
                </div>
                  </div>
                  </div>

                </article>
                <article className="sample-card">
                <div className='section-6'>
                  <div>
                    <img src="assets/WhyUs/team-pic1.jpg" className='team-pic1' alt="" />
                    <img src="assets/WhyUs/team-pic1.jpg" className='team-pic2' alt="" />
                    <img src="assets/WhyUs/team-pic1.jpg" className='team-pic3' alt="" />
                    </div>
            </div>
                </article>

              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}