import React, { Fragment, useEffect, useState } from "react";
import "./modal.css";
import axios from "axios";
import { Alert } from "../../../../../Components/Alert/Alert";

export default function ModalTrashedClients({ onClose }) {
  const [clients, setClients] = useState([]);
  const [responseMessage, setResponseMessage] = useState();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/trashed-clients")
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleRestoreClient = (id) => {
    axios
      .put(`http://127.0.0.1:8000/api/clients/${id}/restore`)
      .then((response) => {
        setClients(clients.filter((client) => client.id !== id));
        setResponseMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleForceDeleteClient = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/trashed-clients/${id}`)
        .then((response) => {
          setClients(clients.filter((client) => client.id !== id));
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
            <h1>Poubelle</h1>
            <button onClick={onClose}>
              <i className="bx bx-x"></i>
            </button>
          </div>
          <div className="parentTabkeTrashed">
            <table border="1" cellSpacing="0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOM</th>
                  <th>PRENOM</th>
                  <th>EMAIL</th>
                  <th>VILLE</th>
                  <th>TELEPHONE</th>
                  <th>WHATSAPP</th>
                  <th>NIVEAU D'ETUDE</th>
                  <th>EXPERIENCE FORMATIVES</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client, index) => (
                  <tr key={index}>
                    <td>{client.id}</td>
                    <td>{client.nom}</td>
                    <td>{client.prenom}</td>
                    <td>{client.email}</td>
                    <td>{client.ville}</td>
                    <td>{client.numero_telephone}</td>
                    <td>{client.numero_whatsapp}</td>
                    <td>{client.niveau_etude}</td>
                    <td>{client.experiences_formatives}</td>
                    <td className="tdButtonsPoubelle">
                      <div>
                        <button
                          className="replyButton"
                          onClick={() => handleRestoreClient(client.id)}
                          title="Restaurer"
                        >
                          <i className="bx bx-reply"></i>
                        </button>
                        <button
                          className="trashForceButton"
                          onClick={() => handleForceDeleteClient(client.id)}
                          title="Forcer la suppression"
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
