import { Fragment, useContext } from "react";
import './dashboard.css';
import NavbarDashboard from "./navbarDashboard/navbarDashboard";
import Views from "./Views/views";
import { LangueContext } from "../../Context/LangueContext";

export default function Dashboard(){

    document.title = 'Touil Digicom - Dashboard';
    return (
        <Fragment>
            <div className="parentDashboard">
                <NavbarDashboard />
                <Views />
            </div>
        </Fragment>
    )
}