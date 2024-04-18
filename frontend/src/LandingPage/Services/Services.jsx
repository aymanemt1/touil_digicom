import React, { Fragment, useContext } from "react";
import "./Services.css";
import { Link } from "react-router-dom";
import { LangueContext } from "../../Context/LangueContext";
import {Translate} from './ServicesTranslate';

export default function Services() {

  const {langue} = useContext(LangueContext);

  const Services = Translate.Services.find((lang)=>(lang.id == langue ));

  const id1 =1
  const id2 =2
  const id3 =3
  const id4 =4


  return (
    <Fragment>
          <div className={langue == 'fr' ? "titleSectionServices" : "titleSectionServices titleSectionServicesAr"}>
            <h1 className='h1LandingPage'>{Services.title}</h1>
            <p>{Services.text}</p>
          </div>
      <div className="wrapperServices">
        <div className={langue == 'fr' ? "containerServices" : "containerServicesAr"}>
          <input className="input" type="radio" name="slide" id="c1"  />
          <label
            htmlFor="c1"
            className="cardServices"
            id="cardServicesMarketing"
          >
            <div className={langue == 'fr' ? "rowServices" : "rowServicesAr"}>
              <div className="iconServices">1</div>
              <div className="description">
                <h4>{Services.card1.title}</h4>
                <p>{Services.card1.description}</p>
                <div className="btnsServices">
                  <Link to={`/service/${id1}`}>
                    <button className="btnMoreDetailServices">
                    {Services.card1.btn1} <i className="bx bx-link-external"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </label>
          <input  className="input" type="radio" name="slide" id="c2" defaultChecked/>
          <label
            htmlFor="c2"
            className="cardServices"
            id="cardServicesFormationKaafat"
          >
            <div className={langue == 'fr' ? "rowServices" : "rowServicesAr"}>
              <div className="iconServices">2</div>
              <div className="description">
                <h4>{Services.card2.title}</h4>
                <p>{Services.card2.description}</p>
                <div className="btnsServices">
                  <Link to={`/service/${id2}`}>
                    <button className="btnMoreDetailServices">
                    {Services.card2.btn2} <i className="bx bxs-calendar-check"></i>
                    </button>
                  </Link>
                  <Link to={`/service/${id2}`}>
                    <button className="btnMoreDetailServices2">
                    {Services.card2.btn1} <i className="bx bx-link-external"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </label>
          <input  className="input" type="radio" name="slide" id="c3" />
          <label htmlFor="c3" className="cardServices" id="cardServicesAudiov">
            <div className={langue == 'fr' ? "rowServices" : "rowServicesAr"}>
              <div className="iconServices">3</div>
              <div className="description">
                <h4>{Services.card3.title}</h4>
                <p>{Services.card3.description}</p>
                <div className="btnsServices">
                  <Link to={`/service/${id3}`}>
                    <button className="btnMoreDetailServices">
                    {Services.card3.btn1} <i className="bx bx-link-external"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </label>
          <input  className="input" type="radio" name="slide" id="c4" />
          <label htmlFor="c4" className="cardServices" id="cardServicesEven">
            <div className={langue == 'fr' ? "rowServices" : "rowServicesAr"}>
              <div className="iconServices">4</div>
              <div className="description">
                <h4>{Services.card4.title} </h4>
                <p>{Services.card4.description}</p>
                <div className="btnsServices">
                  <Link to={`/service/${id4}`}>
                    <button className="btnMoreDetailServices">
                    {Services.card4.btn1} <i className="bx bx-link-external"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </Fragment>
  );
}
