import { Fragment } from "react";
import SideBar from "./sidebar/sidebar";
import { Outlet } from "react-router-dom";
import './views.css'

export default function Views(){
    return (
        <Fragment>
            <div className="parentViews">
                <div className="parentSidebarViews">
                    <SideBar />
                </div>
                <div className="parentContnetView">
                    <Outlet />
                </div>
            </div>
        </Fragment>
    )
}