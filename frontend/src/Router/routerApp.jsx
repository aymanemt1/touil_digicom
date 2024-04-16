import { Fragment } from 'react';
import {Routes, Route } from 'react-router-dom';
import { LandingPage } from '../LandingPage/LandingPage';
import { Contact } from '../LandingPage/Contact/Contact';
import Navbar from '../LandingPage/Navbar/navbar';

export default function RouterApp(){
    return (
       <>
       <Navbar />
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
       </>
          
     
    )
}