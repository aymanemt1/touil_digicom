import { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './navbarDashboard.css'
import axios from "axios";
import { LangueContext } from "../../../Context/LangueContext";

export default function NavbarDashboard(){

    const navigate = useNavigate();

    const {setisauth ,isauth} = useContext(LangueContext);

    // const [token,seToken] = useState(localStorage.getItem('token'))



    // const handleLogout = async () => {
    
    //         sessionStorage.removeItem('token');
    //         sessionStorage.removeItem('admin');
    //         sessionStorage.removeItem('valid');
    
    //         setToken(null); 
    //         navigate('/login');
    //         setisauth(false);

    // };
    

    return (
        <Fragment>
            <div className="parentNavbarDashboard">
                <div className="navbarDashboard">
                <div className="brandLogoDashboard">
                    <Link to='/dashboard/statistiques'>
                        <img src="/assets/Logo/logo4.png" alt="" />
                    </Link>
                </div>
                <div className="linksNavbarDashboard">
                <h4>Bonjour, Omar</h4>
                    <button className="btnSeeMoreServices" >Se déconnecter</button>
                </div>
                </div>
            </div>
        </Fragment>
    )
}