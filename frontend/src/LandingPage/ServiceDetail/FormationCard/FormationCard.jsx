import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './FormationCard.css';
import { Link, useNavigate } from 'react-router-dom';
import Paginate from '../../../Components/Paginate/Paginate';
import { Modules } from '../ModulesCard/Modules';
import { LangueContext } from '../../../Context/LangueContext';

export const FormationCard = () => {
   
    const {setformation_id,setselectall,selectAll,SetvaluesModel,setvalidationScreen} =useContext(LangueContext)
    const [visibleFormationId, setVisibleFormationId] = useState(null);

    const handleVisible = (formationId) => {
        setVisibleFormationId((prevId) => (prevId === formationId ? null : formationId));
    };
const nav = useNavigate()

const reserveFormation = (id) => {
    const formationWithCapacity = formations.find(cap => cap.capacite !== 0);
    if (formationWithCapacity) {
        nav(`/formation/${id}`);
        setformation_id(id);
        setselectall(true);
        SetvaluesModel({});
        setvalidationScreen(false);
    }
}

    
    const currentDate = new Date();
    const [formations, setFormations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/formations?page=${currentPage}`)
            .then((response) => {
                setFormations(response.data.formations.data);
                setCount(response.data.FormationCount);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching formations:', error);
            });
    }, [currentPage]);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(count / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedFormations = formations.slice(startIndex, endIndex);

    
    return (
        <div className='detail-bottom'>
        {loading ? (
            <div className="skeleton-container">
                {[...Array(1)].map((_, index) => (
                    <div className="card-formation skeleton-card" key={index}>
                        <div className='card-image skeleton-image'></div>
                        <div className='card-content'>
                            <div className="titleformation skeleton-title"></div>
                            <div className="descriptionformation">
                                <div className="line"></div>
                                <div className="skeleton-description"></div>
                                <div className="skeleton-description"></div>
                            </div>
                            <div className='buttons-card'>
                                <div className='skeleton-select'></div>
                                <div className='btnReserve skeleton-buttons'></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <>
                {slicedFormations.map((formation) => (
                    <>
                        <div className='card-formation' key={formation.id}>
                            <div className='card-image'>
                                <img className='cardformation-img' src='/assets/DetailService/service1-img1.jpg' alt='service-Image' />
                            </div>
                            <div className='card-formation-content'>
                                <div className="titleformation">
                                    <h4>{formation.titre_fr}</h4>

                                    <div className='righttitle'>
                                    <div className='locationdetail'>
                                    <p className='location'><b>Ville :</b>  {formation.ville}</p>
                                    <p className='location'> <b>Location :</b>  {formation.location}</p>
                                    </div>
                                    <span className='dates'><b>de</b> {formation.date_debut} <b>à</b> {formation.date_fin}</span>
                                    
                                    </div>
                                </div>
                                <div className="descriptionformation">
                                    <div className="line"></div>
                                    <p>{formation.description_fr}</p>
                                </div>
                                <div className='buttons-card'>
                                    <div>
                                    <button className='btnChoisirModules' onClick={() => handleVisible(formation.id)}>
    Choisir les modules {
        visibleFormationId === formation.id ? (
            <i className='bx bxs-up-arrow-circle'></i>
        ) : (
            <i className="bx bxs-down-arrow-circle"></i>
        )
    }
</button>
                                    </div>
                                    <div>
                                        <button
                                            onClick={() => reserveFormation(formation.id)}
                                            className='btnReserve'
                                            id={(new Date(formation.date_fin) < currentDate || formation.capacite === 0) ? "disabledStyle" : ""}
                                            >
                                  {new Date(formation.date_fin) < currentDate ? "Formation Passed" : formation.capacite === 0 ? "No Capacity" : "Reserve"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {visibleFormationId && formation.capacite !== 0 ? <Modules visibleFormationId={visibleFormationId} modules={formation.modules} formationId={formation.id} /> : ''}
                    </>
                ))}
                {
                    formations.length > 3 ? (
                        <Paginate currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
                    ) : ''
                }
            </>
        )}
    </div>
    
    );
};

