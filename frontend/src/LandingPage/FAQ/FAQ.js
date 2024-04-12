import React, { useState } from "react";
import "./FAQ.css";

// Define the FAQItem component
const FAQItem = ({ question, answer, isOpen, onClick }) => {
    return (
        <li className={`faq__faq-item ${isOpen ? 'active' : ''}`} onClick={onClick}>
            <section className="faq-item__summary">
                <p className="faq-item__description">{question}</p>
                <div className="faq-item__arrow-container">
                    <img src="https://assets.codepen.io/3447114/icon-arrow-down.svg" alt="arrow" className="faq-item__arrow-icon" />
                </div>
            </section>
            {/* Toggle the class 'show' based on the isOpen prop */}
            <section className={`faq-item__detail ${isOpen ? 'show' : ''}`}>
                {answer}
            </section>
        </li>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const questions = [
        {
            question: "Quels services propose l’agence TOUIL DIGICOM ?",
            answer: "CONSEIL ET STRATÉGIE · PRINT ET DESIGN · Dev Web · Event · Marketing Digital."
        },
        {
            question: "Quelle est l'idée de ton logo ?",
            answer: "brahim a suggéré l'idée du logo, donc le CTD est comme une pilule,xi haja bhal hayda"
        },
        {
            question: "Comment mesurer le succès des campagnes de marketing digital d'une entreprise?",
            answer: "Utilisez des KPI comme le trafic sur le site, les taux de conversion, l'engagement et le ROI pour évaluer l'efficacité de la campagne."
        },
        {
            question: "Quels sont les éléments clés d'une stratégie de marketing digital réussie?",
            answer: "Les éléments clés sont :  Public cible, 2) Contenu engageant sur toutes les plateformes, 3) Optimisation SEO pour une meilleure visibilité sur les moteurs de recherche, 4) Interaction avec l'audience sur les réseaux sociaux."
        }
    ];

    // Event handler to toggle FAQ items
    const handleItemClick = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="test">
            <section className="faq">
                {/* FAQ image container */}
                <section className="faq__img-container">
                    <div className="main-images-container">
                        <picture className="faq__woman-illustration">
                            <source media="(max-width: 1109px)" srcSet="./assets/FAQ/I1.png" />
                            <source media="(min-width: 1110px)" srcSet="./assets/FAQ/I1.png" />
                            <img src="/images/illustration-woman-online-desktop.svg" alt="Illustration of a woman standing in front of a screen" className="imgFAQ"/>
                        </picture>
                    </div>
                    <img src="https://assets.codepen.io/3447114/illustration-box-desktop.svg" alt="" className="faq__box-illustration" />
                </section>

                {/* FAQ text container */}
                <section className="faq__text-container">
                    <h2 className="faq__heading">FAQ</h2>
                    <ul className="faq__faqs-list">
                        {questions.map((item, index) => (
                            <FAQItem
                                key={index}
                                question={item.question}
                                answer={item.answer}
                                isOpen={openIndex === index}
                                onClick={() => handleItemClick(index)}
                            />
                        ))}
                    </ul>
                </section>
            </section>
        </div>
    );
};

export default FAQ;
