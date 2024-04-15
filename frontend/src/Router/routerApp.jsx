import { Fragment } from 'react';
import {Routes, Route } from 'react-router-dom';
import { LandingPage } from '../LandingPage/LandingPage';
import { Contact } from '../LandingPage/Contact/Contact';

export default function RouterApp(){
    return (
       
                <Routes>
                    <Route 
                        path='/'
                        element={
                            <Fragment>
                                <LandingPage />
                            </Fragment>
                        }
                    />
                    <Route 
                        path='/contact'
                        element={
                                <Contact />
                        }
                    />
                </Routes>
          
     
    )
}