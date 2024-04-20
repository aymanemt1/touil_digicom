import { Fragment, useContext, useRef } from "react";
import { SectionTextTranslate } from './sectionText_Translate';
import './sectionText.css'
import { LangueContext } from "../../../Context/LangueContext";

export default function SectionText(){

    const { langue } = useContext(LangueContext);

    
    const sectionData = SectionTextTranslate.sectionText.find(item => item.id == langue);
    console.log(sectionData)


    const emailRef = useRef();

    function handleSubmit(e){
        e.preventDefault();
        const formData = {
            email : emailRef.current.value,
        }
    }


    return (
        <Fragment>
            <div className="parentSectionText" data-aos="zoom-in" duration='2500'>
                <div className="rowTextBlogs">
                    <h1>
                        {sectionData.title}
                    </h1>
                </div>
                <div className={langue == 'fr' ? "rowinputsSectionText" : "rowinputsSectionText rowinputsSectionTextAr"}>
                    <form onSubmit={handleSubmit}>
                        <input type="email" placeholder={sectionData.inputEmail} />
                        <input type="submit" value={sectionData.inputSubmit} id="submitSectionText" ref={emailRef}/>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}