import React, { Fragment } from 'react'
import { Home } from './Home/Home'
import References from './References/References'
import { Navbar } from './Navbar/Navbar'
import { Adn } from './Adn/Adn'

export const LandingPage = () => {
  return (
    <Fragment>
    <div style={{ background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(241,241,241,1) 100%)'}}>
      <Navbar />
      <Home />
      <References /> 
      <Adn/>
      </div>
      {/* Other components here */}
    </Fragment>
  )
}