import React, { Fragment, useContext, useEffect, useState } from "react";
import { Translate } from "./FAQTranslate";
import { LangueContext } from "../../Context/LangueContext";
import './FAQ.css';

export default function FAQ() {
    useEffect(() => {
        const items = document.querySelectorAll(".accordion button");

        function toggleAccordion() {
            const itemToggle = this.getAttribute('aria-expanded');

            for (let i = 0; i < items.length; i++) { // Declare 'i' using 'let'
                items[i].setAttribute('aria-expanded', 'false');
            }

            if (itemToggle == 'false') {
                this.setAttribute('aria-expanded', 'true');
            }
        }

        items.forEach(item => item.addEventListener('click', toggleAccordion));
    }, []);

    const {langue}=useContext(LangueContext)
  
    const faq = Translate.FAQ.find((lang)=>(
       lang.id == langue
     ))
  
  
    return (
        <div className="faq">
  <h2>Faq</h2>
     <div className="FAQ-content">
  <div className="accordion">
    <div className="accordion-item">
      <button id="accordion-button-1" aria-expanded="false"><span className="accordion-title">{faq.Questions.Q1}</span><span className="icon" aria-hidden="true"></span></button>
      <div className="accordion-content">
        <p>{faq.Responses.R1}</p>
      </div>
    </div>
    <div className="accordion-item">
      <button id="accordion-button-2" aria-expanded="false"><span className="accordion-title">{faq.Questions.Q2}</span><span className="icon" aria-hidden="true"></span></button>
      <div className="accordion-content">
        <p>{faq.Responses.R2}</p>
      </div>
    </div>
    <div className="accordion-item">
      <button id="accordion-button-3" aria-expanded="false"><span className="accordion-title">{faq.Questions.Q3}</span><span className="icon" aria-hidden="true"></span></button>
      <div className="accordion-content">
        <p>{faq.Responses.R3}</p>
      </div>
    </div>
    <div className="accordion-item">
      <button id="accordion-button-4" aria-expanded="false"><span className="accordion-title">{faq.Questions.Q4}</span><span className="icon" aria-hidden="true"></span></button>
      <div className="accordion-content">
        <p>{faq.Responses.R4}</p>
      </div>
    </div>
    <div className="accordion-item">
      <button id="accordion-button-5" aria-expanded="false"><span className="accordion-title">{faq.Questions.Q5}</span><span className="icon" aria-hidden="true"></span></button>
      <div className="accordion-content">
        <p>{faq.Responses.R5}</p>
      </div>
    </div>
  </div>
  <div className="right-faq">
    <img src="/assets/FAQ/faq.png" className="faq-img" alt="" />
  </div>
</div>
        </div>
    );
}
