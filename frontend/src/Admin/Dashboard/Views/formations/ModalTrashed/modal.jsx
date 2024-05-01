import React, { Fragment, useEffect, useState } from "react";
import "./modal.css";
import axios from "axios";
import { Alert } from "../../../../../Components/Alert/Alert";

export default function ModalTrashedFormation({ onClose }) {

  const [formations, setFormations] = useState([]);
  const [responseMessage, setResponseMessage] = useState();


  useEffect(() => {
    axios.get('https://touildigicom.ma/api/trashed-formations')
        .then(response => {
          setFormations(response.data);
        })
        .catch(error => {
            console.error(error);
        });
  }, []);

  const handleRestoreFormation = (id) => {
    axios.put(`https://touildigicom.ma/api/formations/${id}/restore`)
      .then(response => {
        setFormations(formations.filter(formation => formation.id !== id));
        setResponseMessage(response.data.message);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleForceDeleteFormation = (id) => {
    if(window.confirm("Êtes-vous sûr de vouloir supprimer cette formation?")){
      axios.delete(`https://touildigicom.ma/api/trashed-formations/${id}`)
      .then(response => {
        setFormations(formations.filter(formation => formation.id !== id));
        setResponseMessage(response.data.message);
      })
      .catch(error => {
        console.error(error);
      });
    };
  }

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
            <table border='1' cellSpacing='0'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>AFFICHE</th>
                  <th>COVER</th>
                  <th>TITRE</th>
                  <th>DESCRIPTION</th>
                  <th>VILLE</th>
                  <th>LOCALISATION</th>
                  <th>PRIX(DH)</th>
                  <th>CAPACITE</th>
                  <th>DATEDEBUT</th>
                  <th>DATEFIN</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {
                  formations.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td><img src={`/assets/formations/${item.affiche}`} /></td>
                      <td><img src={`/assets/formations/${item.cover}`} /></td>
                      <td>{item.titre_fr}</td>
                      <td>{item.description_fr}</td>
                      <td>{item.ville}</td>
                      <td>{item.ville}</td>
                      <td>{item.prix}</td>
                      <td>{item.capacite}</td>
                      <td>{item.date_debut}</td>
                      <td>{item.date_fin}</td>
                      <td className="tdButtonsPoubelle">
                        <div>
                        <button className="replyButton" onClick={() => handleRestoreFormation(item.id)} title="Entonnoir de suppression">
                          <i className='bx bx-reply' ></i>
                        </button>
                        <button className="trashForceButton" onClick={() => handleForceDeleteFormation(item.id)} title="forcer la suppression">
                          <i className='bx bxs-trash-alt' ></i>
                        </button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
        { responseMessage && <Alert msg={responseMessage} />}
      </div>
    </Fragment>
  );
}
