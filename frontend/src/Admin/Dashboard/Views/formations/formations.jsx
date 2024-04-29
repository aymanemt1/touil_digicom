import React, { Fragment, useEffect, useState } from "react";
import './formations.css';
import ModalAddFormation from "./ModalAdd/modal";
import ModalEditFormation from "./ModalEdit/modal";
import ModalTrashedFormation from "./ModalTrashed/modal";
import axios from 'axios';
import { Alert } from "../../../../Components/Alert/Alert";

export default function FormationDashboard() {
    const [formations, setFormations] = useState([]);
    const [toggleAddFormation, setToggleAddFormation] = useState(false);
    const [toggleEditFormation, setToggleEditFormation] = useState(false);
    const [editFormationId, setEditFormationId] = useState();
    const [togglePoubelle, settogglePoubelle] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); 
    const [responseMessage, setResponseMessage] = useState();


    // Open & close Model Add
    function openAddFormation() {
        setToggleAddFormation(true);
    }
    function closeAddFormation() {
        setToggleAddFormation(false);
    }

    // Open & close Modal Edit
    function openEditFormation(id) {
        setToggleEditFormation(true);
        setEditFormationId(id);
    }
    function closeEditFormation() {
        setToggleEditFormation(false);
    }

    // Open & close Modal Trashed
    function openTrashedFormation() {
        settogglePoubelle(true);
    }
    function closeTrashedFormation() {
        settogglePoubelle(false);
    }

    //fetch formations function
    useEffect(() => {
        fetchFormations();
    }, []);

    useEffect(() => {
        fetchFormations();
    }, [responseMessage]);

    const fetchFormations = () => {
        axios.get('http://127.0.0.1:8000/api/formations/')
            .then(response => {
                setFormations(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // delete formation function
    function deleteFormation(id) {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette formation?")) {
            axios.delete(`http://127.0.0.1:8000/api/formations/${id}`)
                .then(response => {
                    setFormations(prevFormations => prevFormations.filter(formation => formation.id !== id));
                    setResponseMessage(response.data.message);
                    fetchFormations(); 
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }


    // search bar function
    const filteredFormations = formations.filter(formation => {
        return formation.titre_fr.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Sort formations by datetime
    const sortedFormations = [...filteredFormations].sort((a, b) => {
        const dateA = new Date(a.date_debut);
        const dateB = new Date(b.date_debut);
        if (sortOrder === 'asc') {
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });

    // Toggle sort order
    function toggleSortOrder() {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }


       
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/formations');
        setImages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  console.log(images)
    return (
        <Fragment>
            <div className="parentHomeDashboard">
                <div className="chemin">
                    <h6>Dashboard / Formations</h6>
                </div>
                <div className="TitleDashboard formations">
                    <h1>Formations</h1>
                    <div>
                        <button className="btnSeeMoreServices" title="Ajoute Formations" onClick={openAddFormation}>
                            <i className='bx bx-plus-medical' ></i>
                        </button>
                        <button className="btnSeeMoreServices trash" title="poubelle" onClick={openTrashedFormation}>
                            <i className='bx bxs-trash-alt' ></i>
                        </button>
                    </div>
                </div>
                <div className="rowControlsFormation">
                    <button className="btnFilter" onClick={toggleSortOrder}>
                        <i className='bx bx-sort' ></i> <p className="typeSort">{sortOrder}</p>
                    </button>
                    <form className="formSearchFormation" onSubmit={(e) => e.preventDefault()}>
                        <input type="text" placeholder="Chercher(Title) ..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
                                <th>COVER</th>
                                <th>AFFICHE</th>
                                <th>TITRE(FR)</th>
                                <th>TITRE(AR)</th>
                                <th>DESCRIPTION(FR)</th>
                                <th>DESCRIPTION(AR)</th>
                                <th>VILLE</th>
                                <th>CAPACITE</th>
                                <th>DATEDEBUT</th>
                                <th>DATEFIN</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedFormations.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td id="tdImgFormations">
                                    <img src={`http://localhost:8000/storage/formations/cover/${item.cover}`} />
                                    </td>
                                    <td id="tdImgFormations">
                                    <img src={`http://localhost:8000/storage/formations/affiche/${item.affiche}`} />
                                    </td>
                                    <td><h4>{item.titre_fr}</h4></td>
                                    <td><h4>{item.titre_ar}</h4></td>
                                    <td>
                                        <p>{item.description_fr}</p>
                                    </td>
                                    <td>
                                        <p>{item.description_ar}</p>
                                    </td>
                                    <td>{item.ville}</td>
                                    <td>{item.capacite}</td>
                                    <td>{item.date_debut}</td>
                                    <td>{item.date_fin}</td>
                                    <td className="tdActions">
                                        <div>
                                            <button className='btnEdit' onClick={() => openEditFormation(item.id)}>
                                                <i className='bx bxs-edit-alt'></i>
                                            </button>
                                            <button className='btnDelete' onClick={() => deleteFormation(item.id)}>
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
                {toggleAddFormation && <ModalAddFormation onClose={closeAddFormation} setResponseMessage={setResponseMessage}/>}
                {toggleEditFormation && <ModalEditFormation formationId={editFormationId} onClose={closeEditFormation} setResponseMessage={setResponseMessage}/>}
                {togglePoubelle && <ModalTrashedFormation onClose={closeTrashedFormation}  setResponseMessage={setResponseMessage} />}
            </div>
        </Fragment>
    )
}
