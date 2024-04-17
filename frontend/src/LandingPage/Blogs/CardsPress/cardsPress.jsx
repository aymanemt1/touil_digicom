import React, { Fragment } from "react";
import "./cardsPress.css";
import { PresseTouil } from '../blogsData';

export default function CardsPress() {

    console.log(PresseTouil.CardsPress);

    return (
        <Fragment>
            <div className="parentCardsOfPress">
                <h1 className="h1Blogs PresseTitle">TOUIL DIGICOM DANS LA PRESS</h1>
                <div className="cardsPress">
                    {
                        PresseTouil.CardsPress.map((item, index) => (
                            <div className="cardPress" key={index}>
                                <div className="parentImgCardPress">
                                    <img src={`./assets/LaPresse/${item.IconsPress}`} alt={item.Nompresse} />
                                </div>
                                <h3>{item.Nompresse}</h3>
                                <p>{item.DescriptionPress}</p>
                                <a target="_blank" href={item.lienPress}>lire la suite <i className='bx bx-right-arrow-alt'></i></a>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    );
}
