import { Fragment } from "react";
import { teamDevData } from './teamDevData';
import './teamDev.css';

export default function TeamDev(){

    const row1 = [teamDevData.teamDev[0], teamDevData.teamDev[1],];
    
    const row2 = [teamDevData.teamDev[2], teamDevData.teamDev[3],];

    return (
        <Fragment>
            <div className="parentTeamDev">
                <div className="rowTeamDev" data-aos="fade-right">
                    {
                        row1.map((item, index) => (
                            <div className="colTeamDev">
                                <div className="imgTeamDev">
                                    <img src={`./assets/teamDev/${item.img}`} />
                                    <ul className="ulTeamDev">
                                        <li>
                                            <a href={item.socialMedia.instgram} target="_blanka">
                                                <i className='bx bxl-instagram' ></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href={item.socialMedia.whatsapp} target="_blanka">
                                                <i className='bx bxl-whatsapp' ></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href={item.socialMedia.linkedin} target="_blanka">
                                                <i className='bx bxl-linkedin' ></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="infoTeamDev">
                                    <h2>{item.fullname}</h2>
                                    <div className="headline">
                                        <h5>{item.hideline}</h5>
                                        <h5 >
                                            <span className="badgeTeamDev">{item.role}</span>
                                        </h5>
                                    </div>
                                    <div className="messageDev">
                                        <span>
                                            <i className='bx bxs-quote-single-left'></i><i className='bx bxs-quote-single-right' ></i>
                                        </span>
                                        <p>{item.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="rowTeamDev" data-aos="fade-left">
                    {
                        row2.map((item, index) => (
                            <div className="colTeamDev">
                                <div className="imgTeamDev">
                                    <img src={`./assets/teamDev/${item.img}`} />
                                    <ul className="ulTeamDev">
                                        <li>
                                            <a href={item.socialMedia.instgram} target="_blanka">
                                                <i className='bx bxl-instagram' ></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href={item.socialMedia.whatsapp} target="_blanka">
                                                <i className='bx bxl-whatsapp' ></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href={item.socialMedia.linkedin} target="_blanka">
                                                <i className='bx bxl-linkedin' ></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="infoTeamDev">
                                    <h2>{item.fullname}</h2>
                                    <div className="headline">
                                        <h5>{item.hideline}</h5>
                                        <h5 >
                                            <span className="badgeTeamDev">{item.role}</span>
                                        </h5>
                                    </div>
                                    <div className="messageDev" id={`messageDev${index}`}>
                                        <span>
                                            <i className='bx bxs-quote-single-left'></i><i className='bx bxs-quote-single-right' ></i>
                                        </span>
                                        <p>{item.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Fragment>
    )
}