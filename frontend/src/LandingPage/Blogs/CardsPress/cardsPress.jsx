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
                <h1 className={langue == 'fr' ? "h1Blogs" : "h1Blogs h1BlogsAr"}>{cardPresse.title}</h1>
                <div className="cardsPress">
                    {
                        cardPresse.CardsPress.map((item, index) => (
                            <div className="cardPress" key={index}>
                                <div className="parentImgCardPress">
                                    <img src={`./assets/LaPresse/${item.IconsPress}`} alt={item.Nompresse} />
                                </div>
                                <h3>{item.Nompresse}</h3>
                                <p>{item.DescriptionPress}</p>
                                <a target="_blank" href={item.lienPress}>{cardPresse.button}<i className='bx bx-right-arrow-alt'></i></a>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    );
}
