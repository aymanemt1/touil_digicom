import React, { Fragment, useEffect, useState } from "react";
import './formateur.css';
import axios from 'axios';
import { Alert } from "../../../../Components/Alert/Alert";
import ModalAddFormateur from "./ModalAdd/modal";
import ModalEditFormateur from "./ModalEdit/modal";
import ModalTrashedFormateurs from "./ModalTrashed/modal";

export default function FormateurDashboard() {
    const [formateurs, setFormateurs] = useState([]);
    const [toggleAddFormateur, setToggleAddFormateur] = useState(false);
    const [toggleEditFormateur, setToggleEditFormateur] = useState(false);
    const [editFormateurId, setEditFormateurId] = useState();
    const [togglePoubelle, settogglePoubelle] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); 
    const [responseMessage, setResponseMessage] = useState();


    // Open & close Model Add
    function openAddFormateur() {
        setToggleAddFormateur(true);
    }
    function closeAddFormateur() {
        setToggleAddFormateur(false);
    }

    // Open & close Modal Edit
    function openEditFormateur(id) {
        setToggleEditFormateur(true);
        setEditFormateurId(id);
    }
    function closeEditFormateur() {
        setToggleEditFormateur(false);
    }

    // Open & close Modal Trashed
    function openTrashedFormateur() {
        settogglePoubelle(true);
    }
    function closeTrashedFormateur() {
        settogglePoubelle(false);
    }

    
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/formateurs');
        setImages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

    // Fetch formateurs function
    useEffect(() => {
        fetchFormateurs();
    }, []);

    useEffect(() => {
        fetchFormateurs();
    }, [responseMessage]);

    const fetchFormateurs = () => {
        axios.get('http://127.0.0.1:8000/api/formateurs/')
            .then(response => {
                setFormateurs(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Delete formateur function
    function deleteFormateur(id) {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce formateur?")) {
            axios.delete(`http://127.0.0.1:8000/api/formateurs/${id}`)
                .then(response => {
                    setFormateurs(prevFormateurs => prevFormateurs.filter(formateur => formateur.id !== id));
                    setResponseMessage(response.data.message);
                    fetchFormateurs(); 
                })
                .catch(error => {
                    console.error(error);
                    console.log(error.response.data);

                });
        }
    }


    // Search bar function
    const filteredFormateurs = formateurs.filter(formateur => {
        return formateur.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
               formateur.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
               formateur.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
               formateur.specialite.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Sort formateurs by id
    const sortedFormateurs = [...filteredFormateurs].sort((a, b) => {
        const nameA = `${a.id}`;
        const nameB = `${b.id}`;
        if (sortOrder === 'asc') {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    });
    

    // Toggle sort order
    function toggleSortOrder() {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }

    return (
        <Fragment>
            <div className="parentHomeDashboard">
                <div className="chemin">
                    <h6>Dashboard / Formateurs</h6>
                </div>
                <div className="TitleDashboard formations">
                    <h1>Formateurs</h1>
                    <div>
                        <button className="btnSeeMoreServices" title="Ajoute Formations" onClick={openAddFormateur}>
                            <i className='bx bx-plus-medical' ></i>
                        </button>
                        <button className="btnSeeMoreServices trash" title="poubelle" onClick={openTrashedFormateur}>
                            <i className='bx bxs-trash-alt' ></i>
                        </button>
                    </div>
                </div>
                <div className="rowControlsFormation">
                    <button className="btnFilter" onClick={toggleSortOrder}>
                        <i className='bx bx-sort' ></i> <p className="typeSort">{sortOrder}</p>
                    </button>
                    <form className="formSearchFormation" onSubmit={(e) => e.preventDefault()}>
                        <input type="text" placeholder="Chercher(Nom, Prénom, Email, Spécialité) ..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        <button type="submit">
                            <i className='bx bx-search-alt' ></i> 
                        </button>
                    </form>
                </div>
                <div className="parentTableFormations">
                    <table border='1' cellSpacing='0'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>PROFILE</th>
                                <th>NOM</th>
                                <th>PRENOM</th>
                                <th>EMAIL</th>
                                <th>SPECIALITE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedFormateurs.map((formateur, index) => (
                                <tr key={index}>
                                    <td>{formateur.id}</td>
                                    <td>
                                        <img src={`http://localhost:8000/storage/formateurs/${formateur.profile}`} />
                                    </td>
                                    <td><span className="spanNomUppercase">{formateur.nom}</span></td>
                                    <td>{formateur.prenom}</td>
                                    <td>{formateur.email}</td>
                                    <td>{formateur.specialite}</td>
                                    <td className="tdActions">
                                        <div>
                                            <button className='btnEdit' onClick={() => openEditFormateur(formateur.id)}>
                                                <i className='bx bxs-edit-alt'></i>
                                            </button>
                                            <button className='btnDelete' onClick={() => deleteFormateur(formateur.id)}>
                                                <i className='bx bxs-trash-alt' ></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                { responseMessage && <Alert msg={responseMessage} />}
                {toggleAddFormateur && <ModalAddFormateur onClose={closeAddFormateur} setResponseMessage={setResponseMessage}/>}
                {toggleEditFormateur && <ModalEditFormateur formateurId={editFormateurId} onClose={closeEditFormateur} setResponseMessage={setResponseMessage}/>}
                {togglePoubelle && <ModalTrashedFormateurs onClose={closeTrashedFormateur}  setResponseMessage={setResponseMessage} />}
            </div>
        </Fragment>
    )
}
