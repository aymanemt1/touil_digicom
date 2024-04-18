import React, { useState } from 'react';
import './Inscription.css'
export const Inscription = ({ id }) => {
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        telephone: '',
        email: '',
        ville: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className='inscriptionParent'>
            <h2 className='inscription-title'>
                Formulaire d'inscription à la formation en compétences pédagogiques créatives {id}
            </h2>
           <div className='inscription-content'>
           <div className='inscription-form'>
                 <form onSubmit={handleSubmit}>
                <div class="coolinput">
                    <input
                    placeholder='Prénom'
                        type="text"
                        id="prenom"
                        className='input-inscription'
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div class="coolinput">
                    <input
                    placeholder='Nom'
                        type="text"
                        id="nom"
                        className='input-inscription'
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div class="coolinput">
                    <input
                    placeholder='Téléhpone'
                        type="number"
                        id="telephone"
                        className='input-inscription'
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div class="coolinput">
                    <input
                    placeholder='E-mail'
                        type="text"
                        id="email"
                        className='input-inscription'
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div class="coolinput">
                    <input
                    placeholder='Ville'
                        type="text"
                        id="ville"
                        className='input-inscription'
                        name="ville"
                        value={formData.ville}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button className='reserveBtn' type="submit">Envoyer</button>
            </form>
                 </div>
            <div className='inscription-affiche'>
                <img className='affiche'  src="/assets/formations/formation2.png" alt="" />
                 </div>

           </div>
        </div>
    );
};

