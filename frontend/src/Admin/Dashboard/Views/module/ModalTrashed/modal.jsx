import React, { Fragment, useEffect, useState } from "react";
import "./modal.css";
import axios from "axios";
import { Alert } from "../../../../../Components/Alert/Alert";

export default function ModalTrashedModule({ onClose }) {
  const [modules, setFormateurs] = useState([]);
  const [responseMessage, setResponseMessage] = useState();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/trashed-modules")
      .then((response) => {
        setFormateurs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleRestoreFormation = (id) => {
    axios
      .put(`http://127.0.0.1:8000/api/modules/${id}/restore`)
      .then((response) => {
        setFormateurs(modules.filter((module) => module.id !== id));
        setResponseMessage(response.data.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleForceDeleteFormation = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette Module?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/trashed-modules/${id}`)
        .then((response) => {
          setFormateurs(modules.filter((module) => module.id !== id));
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
                  <th>TITRE(FR)</th>
                  <th>FORMATION</th>
                  <th>FORMATEUR</th>
                  <th>DUREE</th>
                  <th>PRIX</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((module, index) => (
                  <tr key={index}>
                    <td>{module.id}</td>
                    <td>{module.titre_fr}</td>
                    <td>{module.formation.titre_fr}</td>
                    <td>{module.formateur.nom} {module.formateur.prenom}</td>
                    <td>{module.duree}</td>
                    <td>{module.prix}</td>
                    <td className="tdButtonsPoubelle">
                      <div>
                        <button
                          className="replyButton"
                          onClick={() => handleRestoreFormation(module.id)}
                          title="Entonnoir de suppression"
                        >
                          <i className="bx bx-reply"></i>
                        </button>
                        <button
                          className="trashForceButton"
                          onClick={() =>
                            handleForceDeleteFormation(module.id)
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
