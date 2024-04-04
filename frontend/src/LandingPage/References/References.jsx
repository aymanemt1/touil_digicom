import { Fragment } from "react";
import { ReferencesData } from "./ReferencesData";
import './References.css';


export default function References(){

    console.log(ReferencesData);

    return ( 
        <Fragment>
            <div className="parentRefLine">
            <center>
            <div className="parentReferences">
                <div className="arrayReferences">
                    {
                        ReferencesData.map((item, index) => (
                            <div className="tooltip">
                                <img src={item.Logo} alt="References" key={index} className="imgLogoRefe"/>
                                <span className='tooltiptext'>{item.Title}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            </center>
                    </div>
        </Fragment>
    )
}