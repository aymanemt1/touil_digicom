import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from '../LandingPage/LandingPage';

export default function RouterApp(){
    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    <Route 
                        path='/'
                        element={
                            <Fragment>
                                <LandingPage />
                            </Fragment>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </Fragment>
    )
}