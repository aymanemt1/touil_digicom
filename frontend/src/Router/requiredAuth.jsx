    import { useContext, useEffect, useState } from "react";
    import { Navigate, Outlet, useNavigate } from "react-router-dom";
    import { LangueContext } from "../Context/LangueContext";
import Cookies from 'js-cookie'
    export default function RequiredAuth() {

    const token = Cookies.get('token') 

    return token ? <Outlet /> : <Navigate to='/login' />;
    }
