

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
      if (sticky) {
        horizontal.style.transform = `translateX(-${sticky.offsetTop}px)`;
      }
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
      <section className="container-whyus">
        <div className="space-holder">
          <div className="sticky">
            <div className="horizontal">
              <section className="cards">
                <article className="sample-card">
                  <div className='section-1'>

                    <div className="text-container">
                      <div className="text-wrapper">
                        <div className="title-container">
                          <div className="title-item active">{WhyUs.title}</div>
                        </div>
                      </div>
                    </div>
                    <div className="image-banner banner">
                      <div className="whyus-image"></div>
                    </div>
                  </div>
                  <div className='section2'>
                    <h1 className='section1-title'>{WhyUs.section1_title}</h1>
                    <p className='section1-text'>{WhyUs.section1_text}</p>
                  </div>

                </article>
                <article className="sample-card">
                  <div className='section-3'>
                    <div className='Parentellipse' >
                      <div className="ellipses-container">
                        <img src="assets/WhyUs/icon1.svg" className='img' alt="" />
                        <div className="ellipses ellipses__outer--thin">

                          <div className="ellipses ellipses__orbit"></div>
                        </div>
                        <div className="ellipses ellipses__outer--thick"></div>
                      </div>
                      <h2 className='title'>{WhyUs.RAPIDITÉ}</h2>
                    </div>
                    <div className='Parentellipse2'>
                      <div className="ellipses-container">
                        <img src="assets/WhyUs/icon2.svg" className='img' alt="" />
                        <div className="ellipses ellipses__outer--thin">

                          <div className="ellipses ellipses__orbit"></div>
                        </div>
                        <div className="ellipses ellipses__outer--thick"></div>
                      </div>
                      <h2 className='title'>{WhyUs.RÉPONSE}</h2>
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
                        <h2 className='title'> {WhyUs.EFFICACITÉ}</h2>
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
                      <h2 className='title'> {WhyUs.FLEXIBILITÉ}</h2>
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