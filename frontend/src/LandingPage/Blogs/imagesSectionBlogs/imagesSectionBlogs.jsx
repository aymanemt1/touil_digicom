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
            <div className="div1"></div>
            <div className="div2"></div>
            <div className={langue == 'fr' ? "div3" : "div3 div3Ar"}>
                <h4>{dataSection.title1}</h4>
                <h1>{dataSection.title2}</h1>
            </div>
            <div className="div4"></div>
            <div className="div5"></div>
            <div className="div6"></div>
            <div className="div7"></div>
            <div className="div8"></div>
            <div className="div9"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
