import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import './sidebar.css';

export default function SideBar(){
    const location = useLocation();

    return (
        <Fragment>
            <div className="parentSideBarDashboard">
                <ul>
                    <li className={location.pathname === '/dashboard/statistiques' ? 'active' : ''}>
                        <Link to='/dashboard/statistiques'>
                            <button>
                                <i className='bx bxs-dashboard' ></i> <span>Statistiques</span>
                            </button>
                        </Link>
                    </li>
                    <li className={location.pathname === '/dashboard/formations' ? 'active' : ''}>
                        <Link to='/dashboard/formations'>
                            <button><i className='bx bx-news'></i> <span>Formations</span></button>
                        </Link>
                    </li>
                    <li className={location.pathname === '/dashboard/modules' ? 'active' : ''}>
                        <Link to='/dashboard/modules'>
                            <button><i className='bx bxs-cheese' ></i> <span>Modules</span></button>
                        </Link>
                    </li>
                    <li className={location.pathname === '/dashboard/formateurs' ? 'active' : ''}>
                        <Link to='/dashboard/formateurs'>
                            <button><i className='bx bxs-id-card' ></i> <span>Formateurs</span></button>
                        </Link>
                    </li>
                    <li className={location.pathname === '/dashboard/reservations' ? 'active' : ''}>
                        <Link to='/dashboard/reservations'>
                            <button><i className='bx bxs-calendar-edit'></i> <span>Reservations</span></button>
                        </Link>
                    </li>
                    <li className={location.pathname === '/dashboard/clients' ? 'active' : ''}>
                        <Link to='/dashboard/clients'>
                            <button><i className='bx bxs-user-detail' ></i> <span>Clients</span></button>
                        </Link>
                    </li>
                </ul>
            </div>
        </Fragment>
    )
}
