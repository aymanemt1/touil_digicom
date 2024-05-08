import { Fragment, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './navbarDashboard.css'
import axios from "axios";
import { LangueContext } from "../../../Context/LangueContext";
import Cookies from 'js-cookie';

export default function NavbarDashboard(){

    const navigate = useNavigate();
    const admin = Cookies.get('adminname') 


    const handleLogout = async () => {
        try {
            // Retrieve the token from the cookie
            const token = Cookies.get("token");
    
            if (!token) {
                console.error("Token not found");
                return;
            }
            await axios.post('http://127.0.0.1:8000/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            Cookies.remove("token");
            Cookies.remove("admin_active");
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }
    

    return (
        <Fragment>
            <div className="parentNavbarDashboard">
                <div className="navbarDashboard">
                <div className="brandLogoDashboard">
                    <Link to='/touil_team_dashboard/statistiques'>
                        <img src="/assets/Logo/logoLandige.png" alt="" />
                    </Link>
                </div>
                <div className="linksNavbarDashboard">
                <h4>Bonjour, {admin}</h4>
                    <button className="btnSeeMoreServices" onClick={handleLogout}>Se déconnecter</button>
                </div>
                </div>
            </div>
        </Fragment>
    )
}