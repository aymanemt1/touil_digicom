import React, { useContext } from "react";
import "./BottomService.css";
import { useNavigate } from "react-router-dom";
import {BottomServiceTranslate} from './BottomServiceTranslate';
import { LangueContext } from "../../../Context/LangueContext";

export const BottomService = () => {
  
  const {langue} = useContext(LangueContext);

  const BottomService = BottomServiceTranslate.BottomService.find(item => item.id == langue);

  const navigate = useNavigate();

  function goTp(){
    navigate('/contact');
  }

  return (
    <div>
      <div className="parentBottomServices" data-aos="fade-up">
        <div className="bottomService">
          <p>{BottomService.title1}</p>
          <h2>{BottomService.title2}</h2>
          <div className="contactServices">
          <h1>
            <i className="bx bxs-phone"></i> +212 628794501
          </h1>
          <h1>
            <i className="bx bxl-whatsapp"></i> +212 711-172764
          </h1>
          </div>
          <h6>{BottomService.title3}</h6>
          <button onClick={goTp}>
          {BottomService.link} <i className="bx bx-link"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
