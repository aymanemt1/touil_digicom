import React from 'react'
import { Navbar } from './Navbar/Navbar'
import { Home } from './Home/Home'

export const LandingPage = () => {
  return (
    <div >
       <div >
       <Navbar />
       </div>
       <div>
         <Home />
       </div>
    </div>
  )
}
