import { Fragment, useContext } from "react";
import { SectionTextTranslate } from './sectionText_Translate';
import './sectionText.css'
import { LangueContext } from "../../../Context/LangueContext";

export default function SectionText(){

    const { langue } = useContext(LangueContext);

    
    const sectionData = SectionTextTranslate.sectionText.find(item => item.id == langue);
    console.log(sectionData)

    return (
        <Fragment>
            <div className="parentSectionText">
                <div className="colTextBlogs">
                    <h1>
                        <span>{sectionData.title1}</span>
                        <span className="text59">{sectionData.title2}<span className="textPlus">{sectionData.title3}</span>
                        </span> <br />
                        <span className="line2SectionText">{sectionData.title4}</span>
                    </h1>
                </div>
                <div className="colBtnBlogs">
                    <img src="./assets/illustrationsRemoveBg/Vector8.png" />
                    <button className="btnSectionTextBlogs">{sectionData.button}</button>
                </div>
            </div>

        </Fragment>
    )
}