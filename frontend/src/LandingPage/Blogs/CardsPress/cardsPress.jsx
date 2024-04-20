import React, { Fragment, useContext } from "react";
import "./cardsPress.css";
import { PresseTouilAr, PresseTouilFr } from './presseData_Translate';
import { LangueContext } from "../../../Context/LangueContext";

export default function CardsPress() {

    const {langue} = useContext(LangueContext);

    const cardPresse = langue == 'fr' ? PresseTouilFr : PresseTouilAr;

    return (
        <Fragment>
            <div className="parentCardsOfPress">
                <h1 className={langue == 'fr' ? "h1Blogs" : "h1Blogs h1BlogsAr"}  data-aos="fade-right">{cardPresse.title}</h1>
                <div className="cardsPress">
                    {
                        cardPresse.CardsPress.map((item, index) => (
                            <div className="cardPress"  data-aos="fade-left" key={index}>
                                <div className="parentImgCardPress" id={`cardpress${index}`}>
                                    <img src={`./assets/LaPresse/${item.IconsPress}`} alt={item.Nompresse} />
                                </div>
                                <h3>{item.Nompresse}</h3>
                                <p>{item.DescriptionPress}</p>
                                <a target="_blank" className="btnSeeMoreServices" href={item.lienPress}>{cardPresse.button}<i className='bx bx-right-arrow-alt'></i></a>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    );
}
