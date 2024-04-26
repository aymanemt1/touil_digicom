import React, { useContext, useEffect, useState } from 'react';
import './Module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LangueContext } from '../../../Context/LangueContext';

export const Modules = (props) => {

    const nav = useNavigate()

    const handleCheckboxChange = (value) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter(item => item !== value));
        } else {
            setSelectedValues([...selectedValues, value]);
        }
    };
    
    const [selectedValues, setSelectedValues] = useState([]);
    const { SetvaluesModel,setselectall,valuesModel,calcPrix,setcalcPrix,setvalidationScreen,langue} = useContext(LangueContext);
  
    const handleSelectAll = () => {
        const allModuleIds = props.modules.map(module => module.id);
        if (selectedValues.length === allModuleIds.length) {
            setSelectedValues([]);
            setselectall(true)

        } else {
            setSelectedValues(allModuleIds); 
            setselectall(false)
        }
      
    };
    const handleReserve = () => {
        SetvaluesModel(selectedValues);
       setvalidationScreen(false)
       nav(`/formation/${props.formationId}`);

    };
 
    return (
        <div className='modules-parent'>
            <div className='modules'>
                {props.modules.map((module, index) => (
                            <label key={index} htmlFor={`checkbox-${module.id}`} className="checkbox-card">
                    <div className={`card-content-wrapper ${selectedValues.includes(module.id) ? 'checked' : ''}`}>
                        <input
                        className='checkboxinput'
                            type="checkbox" 
                            onChange={() => handleCheckboxChange(module.id)}
                            value={module.id}
                            id={`checkbox-${module.id}`}
                            checked={selectedValues.includes(module.id)} 
                        />
                            <h4 className='title'>{langue === 'fr' ? module.titre_fr : module.titre_ar }  </h4>
                            <div className="card-content">
                                <div className='info-personne'>
                                    <img src='/assets/DetailService/service1-img3.jpg' className="profile" alt="profile" />
                                    <p>{module.formateur.nom} {module.formateur.prenom}</p>
                                </div>
                                <div className='module-info'>
                                    <b>Durée: {module.duree}H</b>
                                    <b>Prix: {module.prix}DH</b>
                                </div>
                            </div>
                        </div>
                    </label>
                ))}
            </div>
            <div className='btn-module'>
                <button
                    className='selectAllbutton'
                    onClick={handleSelectAll}
                >
                    {selectedValues.length === props.modules.length && langue === "fr" ? 'Supprimer tout' : 'Tout sélectionner'}
                </button>
                {selectedValues.length >0 ? (
                <button
                    className='reservemodule'
                    onClick={handleReserve}
                >
                    {langue === 'fr' ? "Réserver" : 'إحجز' }
                </button>

                ) : ''}

            </div>
        </div>
    );
};
