import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import "./FormationCard.css";
import { Link, useNavigate } from "react-router-dom";
import Paginate from "../../../Components/Paginate/Paginate";
import { Modules } from "../ModulesCard/Modules";
import { LangueContext } from "../../../Context/LangueContext";

export const FormationCard = () => {


  const {
    setformation_id,
    setselectall,
    selectAll,
    SetvaluesModel,
    setvalidationScreen,
    lang
  } = useContext(LangueContext);

  const [visibleFormationId, setVisibleFormationId] = useState(null);

  const handleVisible = (formationId) => {
    setVisibleFormationId((prevId) =>
      prevId == formationId ? null : formationId
    );
  };
  
  const nav = useNavigate();

  const reserveFormation = (id) => {
    const formationWithCapacity = formations.find((cap) => cap.capacite !== 0);
    if (formationWithCapacity) {
      nav(`/formation/${id}`);
      setformation_id(id);
      setselectall(true);
      SetvaluesModel({});
      setvalidationScreen(false);
    }
  };

  const currentDate = new Date();
  const [formations, setFormations] = useState([]);
  const [filtredformations, setfiltredformations] = useState([])

  const [loading, setLoading] = useState(true);

  console.log(formations)

    // pour pagination 
    const [count, setCount] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;


  const fetchData = async () => {
    try {
      const response = await axios.get(`https://touildigicom.ma/api/formationsdata?page=${currentPage}`);
      setCount(response.data.formationCount)
      setFormations(response.data.formations.data);
  console.log(response)
      console.log(response)
     
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

 useEffect(() => {
    fetchData();
}, [])
  
  
   
    useEffect(() => {
      if (Array.isArray(formations) && formations.length > 0) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const slicedFormations = formations.slice(startIndex, endIndex);
        setfiltredformations(slicedFormations);
      }
    }, [currentPage, formations, itemsPerPage]);
    
    const handlePageChange = (event, page) => {
      setCurrentPage(page);
    };
   
    const totalPages = Math.ceil(count / itemsPerPage);
    console.log(count)

  return (
    <Fragment>
      <div className="detail-bottom">
        <h2 className="titleformations">Notre Formations </h2>
        {filtredformations.map((formation) => (
          <>
            <div className="card-formation" key={formation.id}>
              <div className="card-image">
                <img
                  className="cardformation-img"
                  src={`https://touildigicom.ma/storage/formations/cover/${formation.cover}`}
                  alt="service-Image"
                  onError={(e) => {
                    e.target.src = "/assets/altImage/alt-img.jpg";
                  }}
                />
              </div>
              <div className="card-formation-content">
                <div className="titleformation">
                  <h4>{ formation.titre_fr }</h4>
                  {/* <h4>{ lang == 'fr' ?  formation.titre_fr : formation.titre_ar }</h4> */}
                  <div className="righttitle">
                    <div className="locationdetail">
                      <p className="location">
                        <b>
                          <i className="bx bx-buildings"></i> Ville :
                        </b>{" "}
                        {formation.ville}
                      </p>
                      <p className="location">
                        <b>
                          <i className="bx bxs-location-plus"></i> Localisation
                          :
                        </b>
                        {formation.location}
                      </p>
                    </div>
                    <span className="dates">
                      <b>de</b> {formation.date_debut} <b>à</b>
                      {formation.date_fin}
                    </span>
                  </div>
                </div>
                <div className="descriptionformation">
                  <div className="line"></div>
                  <p>{formation.description_fr}</p>
                  {/* <p>{ lang == 'fr' ?  formation.description_fr : formation.description_ar }</p> */}
                </div>
                <div className="buttons-card">
                  <div>
                    <button
                      className="btnChoisirModules"
                      onClick={() => handleVisible(formation.id)}
                    >
                      Choisir les modules
                      {visibleFormationId === formation.id ? (
                        <i className="bx bxs-up-arrow-circle"></i>
                      ) : (
                        <i className="bx bxs-down-arrow-circle"></i>
                      )}
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => reserveFormation(formation.id)}
                      className="btnReserve"
                      id={
                        new Date(formation.date_fin) < currentDate ||
                        formation.capacite === 0
                          ? "disabledStyle"
                          : ""
                      }
                    >
                      {new Date(formation.date_fin) < currentDate
                        ? "Formation Passed"
                        : formation.capacite === 0
                        ? "No Capacity"
                        : "Reserve"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {visibleFormationId && formation.capacite !== 0 ? (
              <Modules
                visibleFormationId={visibleFormationId}
                modules={formation.modules}
                formationId={formation.id}
              />
            ) : (
              ""
            )}
          </>
        ))}
        {formations.length >2 ? (
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
};
