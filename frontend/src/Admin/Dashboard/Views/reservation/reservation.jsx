import React, { Fragment, useEffect, useState } from "react";
import "./reservation.css";
import axios from "axios";
import { Alert } from "../../../../Components/Alert/Alert";
import ModalAddReservation from "./ModalAdd/modal";
import ModalEditReservation from "./ModalEdit/modal";
import ModalTrashedReservations from "./ModalTrashed/modal";

export default function ReservationDashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsValidate, setreservationsValidate] = useState([]);
  const [toggleAddReservation, setToggleAddReservation] = useState(false);
  const [toggleEditReservation, setToggleEditReservation] = useState(false);
  const [editReservationId, setEditReservationId] = useState();
  const [togglePoubelle, setTogglePoubelle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [responseMessage, setResponseMessage] = useState();
  const [toggleInfoClient, setToggleInfoClient] = useState(false);
  const [validate, setvalidate] = useState(false);

  // Open & close Modal Add
  function openAddReservation() {
    setToggleAddReservation(true);
  }
  function closeAddReservation() {
    setToggleAddReservation(false);
  }

  // Open & close Modal Edit
  function openEditReservation(id) {
    setToggleEditReservation(true);
    setEditReservationId(id);
  }
  function closeEditReservation() {
    setToggleEditReservation(false);
  }

  // Open & close Modal Trashed
  function openTrashedReservations() {
    setTogglePoubelle(true);
  }
  function closeTrashedReservations() {
    setTogglePoubelle(false);
  }
  const handleValidate = async (formationId, clientId) => {

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/checkReservation', {
        formation_id: formationId,
        client_id: clientId
      });
    setvalidate(!validate)
     
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const { formation, client } = reservations;
    if (formation && client) {
      handleValidate(formation.id, client.id);
    }
  }, [reservations]);
 
  function openInfoClient(reservationId) {
    setToggleInfoClient(
      reservationId === toggleInfoClient ? null : reservationId
    );
  }

  // Fetch reservations function
  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [responseMessage]);

  const fetchReservations = () => {
    axios
      .get("http://127.0.0.1:8000/api/reservations/")
      .then((response) => {
        setReservations(response.data);   
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Delete reservation function
  function deleteReservation(id) {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette Réservation?")
    ) {
      axios
        .delete(`http://127.0.0.1:8000/api/reservations/${id}`)
        .then((response) => {
          setReservations((prevReservations) =>
            prevReservations.filter((reservation) => reservation.id !== id)
          );
          setResponseMessage(response.data.message);
          fetchReservations();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  // Search bar function
  const filteredReservations = reservations
    ? reservations.filter((reservation) => {
        const clientNom = reservation.client.nom.toLowerCase();
        const clientPrenom = reservation.client.prenom.toLowerCase();

        const clientFullName = `${clientNom} ${clientPrenom}`;

        const formationTitreFr = reservation.formation
          ? reservation.formation.titre_fr.toLowerCase()
          : "";
        const formateurNomPrenom = reservation.formateur
          ? `${reservation.formateur.nom} ${reservation.formateur.prenom}`.toLowerCase()
          : "";

        return (
          clientFullName.includes(searchQuery.toLowerCase()) ||
          formationTitreFr.includes(searchQuery.toLowerCase()) ||
          formateurNomPrenom.includes(searchQuery.toLowerCase())
        );
      })
    : [];

  // Sort reservations by date_validation & timeValidation
  const sortedReservations = [...filteredReservations].sort((a, b) => {
    const dateA = new Date(`${a.date_validation}T${a.time_validation}`);
    const dateB = new Date(`${b.date_validation}T${b.time_validation}`);
    if (sortOrder === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  // Toggle sort order
  function toggleSortOrder() {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }

  return (
    <Fragment>
      <div className="parentHomeDashboard">
        <div className="chemin">
          <h6>Dashboard / Reservations</h6>
        </div>
        <div className="TitleDashboard formations">
          <h1>RESERVATIONS</h1>
          <div>
            <button
              className="btnSeeMoreServices"
              title="Add a reservation"
              onClick={openAddReservation}
            >
              <i className="bx bx-plus-medical"></i>
            </button>
            <button
              className="btnSeeMoreServices trash"
              title="Trash"
              onClick={openTrashedReservations}
            >
              <i className="bx bxs-trash-alt"></i>
            </button>
          </div>
        </div>
        <div className="rowControlsFormation">
          <button className="btnFilter" onClick={toggleSortOrder}>
            <i className="bx bx-sort"></i>{" "}
            <p className="typeSort">{sortOrder}</p>
          </button>
          <form
            className="formSearchFormation"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Search (Title, Formation, Formateur) ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <i className="bx bx-search-alt"></i>
            </button>
          </form>
        </div>
        <div className="parentTableFormations">
          <table border="1" cellSpacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>CLIENT</th>
                <th>FORMATION</th>
                <th>MODULES</th>
                <th>DATE VALIDATION</th>
                <th>HEURE CONFIRMATION</th>
                <th>PRIX(DH)</th>
                <th>VALIDATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {sortedReservations.map((reservation, index) => (
                <>
                  <tr key={index}>
                    <td>{reservation.id}</td>
                    <td>
                      {reservation.client ? (
                        <>
                          <span className="spanNomUppercase">
                            {reservation.client.nom}
                          </span>{" "}
                          {reservation.client.prenom}{" "}
                          <button
                            onClick={() => openInfoClient(reservation.id)}
                            className="buttonInfoClient"
                          >
                            <i className="bx bx-info-circle"></i>
                          </button>
                        </>
                      ) : (
                        `N'existe pas`
                      )}
                    </td>
                    <td>
                      {reservation.formation ? (
                        <>
                          {reservation.formation.id} -{" "}
                          {reservation.formation.titre_fr}
                        </>
                      ) : (
                        `N'existe pas`
                      )}
                    </td>
                    <td>
                      <table>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Titre</th>
                            <th>Prix(DH)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reservation.modules
                            ? reservation.modules.map((module, index) => (
                                <tr key={index}>
                                  <td>{module.id}</td>
                                  <td>{module.titre_fr}</td>
                                  <td>{module.prix}</td>
                                </tr>
                              ))
                            : `N'existe pas`}
                        </tbody>
                      </table>
                    </td>
                    <td>{reservation.date_validation} </td>
                    <td>{reservation.time_validation}</td>
                    <td>{reservation.prix}</td>
                    <td>
                      {reservation.validate == 0 ?(
                        <i className="bx bxs-x-square" onClick={() => handleValidate(reservation.formation.id, reservation.client.id)}></i>
                        
                      ) : (
                        <i  className="bx bxs-check-square" onClick={() => handleValidate(reservation.formation.id, reservation.client.id)}></i>

                      )}
</td>

                    <td className="tdActions">
                      <div>
                        <button
                          className="btnEdit"
                          onClick={() => openEditReservation(reservation.id)}
                        >
                          <i className="bx bxs-edit-alt"></i>
                        </button>
                        <button
                          className="btnDelete"
                          onClick={() => deleteReservation(reservation.id)}
                        >
                          <i className="bx bxs-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {toggleInfoClient === reservation.id && (
                    <tr key={`${index}-info`}>
                      <td colSpan="9">
                        <div>
                          <table id="tableInfoClient">
                            <tbody>
                              <tr>
                                <td>
                                  Nom :{" "}
                                  <span className="spanNomUppercase">
                                    {reservation.client.nom}
                                  </span>{" "}
                                </td>
                                <td>Prenom : {reservation.client.prenom} </td>
                              </tr>
                              <tr>
                                <td>
                                  Date Naissance :{" "}
                                  {reservation.client.date_naissance}{" "}
                                </td>
                                <td>Ville : {reservation.client.ville} </td>
                              </tr>
                              <tr>
                                <td>Email : {reservation.client.email} </td>
                                <td>
                                  Niveau Etude :{" "}
                                  {reservation.client.niveau_etude}{" "}
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  Numero Telephone :{" "}
                                  {reservation.client.numero_telephone}{" "}
                                </td>
                                <td>
                                  Numero Whatsapp :{" "}
                                  {reservation.client.numero_whatsapp}{" "}
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="2">
                                  Experiences Formatives :{" "}
                                  {reservation.client.experiences_formatives}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        {responseMessage && <Alert msg={responseMessage} />}
        {toggleEditReservation && (
          <ModalEditReservation
            reservationId={editReservationId}
            onClose={closeEditReservation}
            setResponseMessage={setResponseMessage}
          />
        )}
        {togglePoubelle && (
          <ModalTrashedReservations
            onClose={closeTrashedReservations}
            setResponseMessage={setResponseMessage}
          />
        )}
        {toggleAddReservation && (
          <ModalAddReservation
            onClose={closeAddReservation}
            setResponseMessage={setResponseMessage}
          />
        )}
      </div>
    </Fragment>
  );
}
