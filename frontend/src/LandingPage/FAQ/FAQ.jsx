import React, { Fragment, useContext, useState } from "react";
import { Translate } from "./FAQTranslate";
import { LangueContext } from "../../Context/LangueContext";
import './FAQ.css';

export default function FAQ() {
    const { langue } = useContext(LangueContext);
    const FAQData = Translate.FAQ.find(lang => lang.id === langue);

    const [expandedQuestion, setExpandedQuestion] = useState(null);

    const toggleQuestion = (index) => {
        if (expandedQuestion === index) {
            setExpandedQuestion(null);
        } else {
            setExpandedQuestion(index);
        }
    };

    return (
        <Fragment>
            <div className="parentSectionFAQ">
                <div className="colImagesFAQ">
                    <img src="./assets/illustrationsRemoveBg/i15.png" alt="FAQ" className="imgFAQ1"/>
                    <img src="./assets/illustrationsRemoveBg/i16.png" alt="FAQ" className="imgFAQ2"/>
                </div>
                <div className="colTextFAQ">
                    <h1>{FAQData.title}</h1>
                    <ul className="ulFAQuestions">
                        {Object.keys(FAQData.Questions).map((key, index) => (
                            <li key={index}>
                                <button onClick={() => toggleQuestion(index)} className="btnFAQ">
                                    {FAQData.Questions[key]} <i className='bx bx-chevrons-down'></i>
                                </button>
                                <p className={`descriptionResponse ${expandedQuestion === index ? 'slideDownAnimation' : ''}`}>
                                    {expandedQuestion === index && FAQData.Responses[`R${index + 1}`]}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Fragment>
    );
}
