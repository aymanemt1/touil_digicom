import React, { Fragment, useEffect, useState } from "react";
import "./modal.css";
import axios from "axios";
import { Alert } from "../../../../../Components/Alert/Alert";

export default function ModalTrashedReservation({ onClose }) {


  const apiUrl = process.env.REACT_APP_API_URL;


  const [reservations, setReservations] = useState([]);
  const [responseMessage, setResponseMessage] = useState();

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/trashed-reservations`)
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleRestoreReservation = (id) => {
    axios
      .put(`${apiUrl}/api/reservations/${id}/restore`)
      .then((response) => {
        setReservations(
          reservations.filter((reservation) => reservation.id !== id)
        );
        setResponseMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleForceDeleteReservation = (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette réservation?")
    ) {
      axios
        .delete(`${apiUrl}/api/trashed-reservations/${id}`)
        .then((response) => {
          setReservations(
            reservations.filter((reservation) => reservation.id !== id)
          );
          setResponseMessage(response.data.message);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Fragment>
      <div className="parentModalAddFormation">
        <div className="modalPopelle">
          <div className="headerModal">
            <h1>Poubelle des réservations</h1>
            <button onClick={onClose}>
              <i className="bx bx-x"></i>
            </button>
          </div>
          <div className="parentTabkeTrashed">
            <table border="1" cellSpacing="0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Formation</th>
                  <th>Date de validation</th>
                  <th>Time validation</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation, index) => (
                  <tr key={index}>
                    <td>{reservation.id}</td>
                    <td>{reservation.client_id}</td>
                    <td>{reservation.formation_id}</td>
                    <td>{reservation.date_validation}</td>
                    <td>{reservation.timeValidation}</td>
                    <td>{reservation.prix}</td>
                    <td className="tdButtonsPoubelle">
                      <div>
                        <button
                          className="replyButton"
                          onClick={() =>
                            handleRestoreReservation(reservation.id)
                          }
                          title="Restaurer la réservation"
                        >
                          <i className="bx bx-reply"></i>
                        </button>
                        <button
                          className="trashForceButton"
                          onClick={() =>
                            handleForceDeleteReservation(reservation.id)
                          }
                          title="Supprimer définitivement"
                        >
                          <i className="bx bxs-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {responseMessage && <Alert msg={responseMessage} />}
      </div>
    </Fragment>
  );
}
