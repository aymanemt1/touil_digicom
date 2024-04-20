import React, { Fragment, useContext } from "react";
import {LangueContext} from '../../../Context/LangueContext';
import {imagesSectionTranslate} from './imagesSectionBlogs_Translate';
import './imagesSectionBlogs.css';


export default function ImagesBlogFirstSection() {
  
  const {langue} = useContext(LangueContext);

  const dataSection = imagesSectionTranslate.dataSection.find(item => item.id == langue);


  return (
    <Fragment>
      <div className="parentBlogs">
        <div className="imagesSectionBlogs">
          <div className="parent">
            <div className="div1" data-aos="fade-right"></div>
            <div className="div2" data-aos="fade-left"></div>
            <div className={langue == 'fr' ? "div3" : "div3 div3Ar"} >
                <h4>{dataSection.title1}</h4>
                <h1>{dataSection.title2}</h1>
            </div>
            <div className="div4" data-aos="fade-down-left"></div>
            <div className="div5" data-aos="fade-down"></div>
            <div className="div6" data-aos="fade-up-right"></div>
            <div className="div7" data-aos="fade-down-left"></div>
            <div className="div8" ></div>
            <div className="div9" data-aos="fade-up-left"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
