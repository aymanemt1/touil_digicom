import React, { useState } from 'react'
import { useParams } from 'react-router'
import './Servicedetail.css'
import Navbar from '../Navbar/navbar'
import {servicedata} from "./ServicesData"

export const Servicedetail = () => {
  const { id } = useParams();

  const service = servicedata.find(department => department.id == id)

  const [showAllServices, setShowAllServices] = useState(false);

  const handleShowAllServices = () => {
    setShowAllServices(!showAllServices);
  };
  return (
  <div className='servicedetail'>
<div className='servicedetailheader' style={{
  width: '100%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  height: '50vh',
  opacity: 0.8,
  color: 'white',
  backgroundImage: `
    linear-gradient(0deg, rgb(232,69,30), rgba(250, 132, 22, 0.087),
    rgba(251, 201, 37, 0.096)), 
    url("/assets/bgServices/${service.cover}")
  `
}}>
</div>
  
     <div className='servicedetailcontent'>
<div className='detail-top'>
  
     <div className='left-detail'>
<h1 className='title-service'>{service.name}</h1>

        <p className='servicedetailtext'>
      {service.description}
       </p>
      {/* {service.btn ? <button className='btnReservation'>{service.btn}</button> :""} */}

       </div>
      
     <div className='right-detail'>
     <img id='service-img' className='service-img1' src={`/assets/DetailService/${service.images[0]}.jpg`} alt='service-Image'/>
       {/* <img id='service-img' className='service-img2' src={`/assets/DetailService/${service.images[1]}.jpg`} alt='service-Image'/> */}
     </div>
     </div>
     <div className='detail-bottom'>
     {!showAllServices ? 
     (
  service.type.slice(0, 3).map((dep) => (
    <div className="servicedetail-types">
     <div className='title'>
     <img id='service-icon' src={`/assets/DetailService/${dep.icon}.png`} alt='service-Image'/>
      <h4>{dep.title}</h4>
    </div>
      <p>{dep.content}</p>
    </div>
  ))
)
 : (
  service.type.map((dep) => (
    <div className="servicedetail-types">
    <div className='title'>
    <img id='service-icon' src={`/assets/DetailService/${dep.icon}.png`} alt='service-Image'/>
      <h4>{dep.title}</h4>
    </div>
      <p>{dep.content}</p>
     
    </div>
  ))
)}
      {/* <button className='lire-btn' onClick={handleShowAllServices}>
        {showAllServices ? 'Less' : "Lire plus"}
      </button> */}

       </div>
     </div>
    </div>
  )
}
