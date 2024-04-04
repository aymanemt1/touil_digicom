import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../Partials/Navbar/navbar';

export default function RouterApp(){
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route 
                        path='/'
                        element={
                            <Fragment>
                                <Navbar />
                            </Fragment>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </Fragment>
    )
}