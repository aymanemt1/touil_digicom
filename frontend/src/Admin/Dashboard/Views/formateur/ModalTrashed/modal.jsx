import React, { Fragment, useEffect, useState } from "react";
import "./modal.css";
import axios from "axios";
import { Alert } from "../../../../../Components/Alert/Alert";

export default function ModalTrashedFormateurs({ onClose }) {
  const [formateurs, setFormateurs] = useState([]);
  const [responseMessage, setResponseMessage] = useState();

      
  useEffect(() => {
    axios
      .get("https://touildigicom.ma/api/trashed-formateurs")
      .then((response) => {
        setFormateurs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleRestoreFormation = (id) => {
    axios
      .put(`https://touildigicom.ma/api/formateurs/${id}/restore`)
      .then((response) => {
        setFormateurs(formateurs.filter((formateur) => formateur.id !== id));
        setResponseMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleForceDeleteFormation = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette formation?")) {
      axios
        .delete(`https://touildigicom.ma/api/trashed-formateurs/${id}`)
        .then((response) => {
          setFormateurs(formateurs.filter((formateur) => formateur.id !== id));
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
                  <th>PROFILE</th>
                  <th>NOM</th>
                  <th>PRENOM</th>
                  <th>EMAIL</th>
                  <th>SPECIALITE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {formateurs.map((formateur, index) => (
                  <tr key={index}>
                    <td>{formateur.id}</td>
                    <td>
                      <img
                        src={`/assets/formations/${formateur.profile}`}
                        alt=""
                      />
                    </td>
                    <td>{formateur.nom}</td>
                    <td>{formateur.prenom}</td>
                    <td>{formateur.email}</td>
                    <td>{formateur.specialite}</td>
                    <td className="tdButtonsPoubelle">
                      <div>
                        <button
                          className="replyButton"
                          onClick={() => handleRestoreFormation(formateur.id)}
                          title="Entonnoir de suppression"
                        >
                          <i className="bx bx-reply"></i>
                        </button>
                        <button
                          className="trashForceButton"
                          onClick={() =>
                            handleForceDeleteFormation(formateur.id)
                          }
                          title="forcer la suppression"
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
