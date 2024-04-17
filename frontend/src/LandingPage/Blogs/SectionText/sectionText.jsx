import { Fragment } from "react";
import './sectionText.css'

export default function SectionText(){
    return (
        <Fragment>
            <div className="parentSectionText">
                <div className="colTextBlogs">
                    <h1>
                        <span>Prêt à franchir le cap? Plus de</span>
                        <span className="text59">59 <span className="textPlus">+</span>
                        </span> <br />
                        <span className="line2SectionText">clients ont déjà fait le choix de nous faire confiance. Rejoignez-les dès aujourd'hui et boostez votre entreprise avec nos services.</span>
                    </h1>
                </div>
                <div className="colBtnBlogs">
                    <img src="./assets/illustrationsRemoveBg/Vector8.png" />
                    <button className="btnSectionTextBlogs">Rejoignez-nous</button>
                </div>
            </div>

        </Fragment>
    )
}