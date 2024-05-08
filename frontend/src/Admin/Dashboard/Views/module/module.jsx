import React, { Fragment, useEffect, useState } from "react";
import './module.css';
import axios from 'axios';
import { Alert } from "../../../../Components/Alert/Alert";
import ModalAddModule from "./ModalAdd/modal";
import ModalEditModule from "./ModalEdit/modal";
import ModalTrashedModules from "./ModalTrashed/modal";

export default function ModuleDashboard() {
    const [modules, setModules] = useState([]);
    const [toggleAddModule, setToggleAddModule] = useState(false);
    const [toggleEditModule, setToggleEditModule] = useState(false);
    const [editModuleId, setEditModuleId] = useState();
    const [togglePoubelle, setTogglePoubelle] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); 
    const [responseMessage, setResponseMessage] = useState();

    // Open & close Modal Add
    function openAddModule() {
        setToggleAddModule(true);
    }
    function closeAddModule() {
        setToggleAddModule(false);
    }

    // Open & close Modal Edit
    function openEditModule(id) {
        setToggleEditModule(true);
        setEditModuleId(id);
    }
    function closeEditModule() {
        setToggleEditModule(false);
    }

    // Open & close Modal Trashed
    function openTrashedModule() {
        setTogglePoubelle(true);
    }
    function closeTrashedModule() {
        setTogglePoubelle(false);
    }

    // Fetch modules function
    useEffect(() => {
        fetchModules();
    }, []);

    useEffect(() => {
        fetchModules();
    }, [responseMessage]);

    const fetchModules = () => {
        axios.get('http://127.0.0.1:8000/api/modules/')
            .then(response => {
                setModules(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    // Delete module function
    function deleteModule(id) {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce module ?")) {
            axios.delete(`http://127.0.0.1:8000/api/modules/${id}`)
                .then(response => {
                    setModules(prevModules => prevModules.filter(module => module.id !== id));
                    setResponseMessage(response.data.message);
                    fetchModules(); 
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    // Search bar function
    const filteredModules = modules ? modules.filter(module => {
        const formationTitreFr = module.formation ? module.formation.titre_fr.toLowerCase() : '';
        const formateurNomPrenom = module.formateur ? `${module.formateur.nom} ${module.formateur.prenom}`.toLowerCase() : '';
        
        return (
            module.titre_fr.toLowerCase().includes(searchQuery.toLowerCase()) ||
            formationTitreFr.includes(searchQuery.toLowerCase()) ||
            formateurNomPrenom.includes(searchQuery.toLowerCase())
        );
    }) : [];
    

    // Sort modules by id
    const sortedModules = [...filteredModules].sort((a, b) => {
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
                    <h6>Dashboard / Modules</h6>
                </div>
                <div className="TitleDashboard formations">
                    <h1>MODULES</h1>
                    <div>
                        <button className="btnSeeMoreServices" title="Ajouter un module" onClick={openAddModule}>
                            <i className='bx bx-plus-medical' ></i>
                        </button>
                        <button className="btnSeeMoreServices trash" title="Poubelle" onClick={openTrashedModule}>
                            <i className='bx bxs-trash-alt' ></i>
                        </button>
                    </div>
                </div>
                <div className="rowControlsFormation">
                    <button className="btnFilter" onClick={toggleSortOrder}>
                        <i className='bx bx-sort' ></i> <p className="typeSort">{sortOrder}</p>
                    </button>
                    <form className="formSearchFormation" onSubmit={(e) => e.preventDefault()}>
                        <input type="text" placeholder="Chercher(Titre, Formation, Formateur) ..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
                                <th>TITRE(FR)</th>
                                <th>TITRE(AR)</th>
                                <th>FORMATION</th>
                                <th>FORMATEUR</th>
                                <th>DUREE</th>
                                <th>PRIX(DH)</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedModules.map((module, index) => (
                                <tr key={index}>
                                    <td>{module.id}</td>
                                    <td>{module.titre_fr}</td>
                                    <td>{module.titre_ar}</td>
                                    <td>{module.formation ? module.formation.titre_fr : null}</td>
                                    <td>{module.formateur ? module.formateur.nom : `N'existe pas` } {module.formateur ? module.formateur.prenom : ``}</td>
                                    <td>{module.duree}</td>
                                    <td>{module.prix}</td>
                                    <td className="tdActions">
                                        <div>
                                            <button className='btnEdit' onClick={() => openEditModule(module.id)}>
                                                <i className='bx bxs-edit-alt'></i>
                                            </button>
                                            <button className='btnDelete' onClick={() => deleteModule(module.id)}>
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
                {toggleAddModule && <ModalAddModule onClose={closeAddModule} setResponseMessage={setResponseMessage}/>}
                {toggleEditModule && <ModalEditModule moduleId={editModuleId} onClose={closeEditModule} setResponseMessage={setResponseMessage}/>}
                {togglePoubelle && <ModalTrashedModules onClose={closeTrashedModule}  setResponseMessage={setResponseMessage} />}
            </div>
        </Fragment>
    )
}
