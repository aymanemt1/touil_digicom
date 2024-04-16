import React from 'react'
import { useParams } from 'react-router'
import './Servicedetail.css'
import Navbar from '../Navbar/navbar'
import {servicedata} from "./ServicesData"

export const Servicedetail = () => {
  const { id } = useParams();
  console.log(id);
  
  console.log(servicedata.id);
  
  return (
    <div className='servicedetail'>
     <div className='servicedetailheader'>
       SERVICE {id}
     </div>
     <div className='servicedetailcontent'>

      <div className='left-detail'>
        <p className='servicedetailtext'>
      Notre département de Formation, connu sous le nom de KAFAAT, est dédié à l'excellence dans le développement des compétences et des connaissances. 
      Nous proposons des programmes de formation de haute qualité encadrés par des spécialistes experts et qualifiés dans divers domaines,
       offrant ainsi une opportunité unique d'apprentissage et de croissance professionnelle.
       </p>
       </div>
       <div className='right-detail'>
     
       </div>
     </div>
    </div>
  )
}
