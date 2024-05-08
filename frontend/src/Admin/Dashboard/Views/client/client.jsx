import React, { Fragment, useEffect, useState } from "react";
import "./client.css";
import axios from "axios";
import { Alert } from "../../../../Components/Alert/Alert";
import ModalAddClient from "./ModalAdd/modal";
import ModalEditClient from "./ModalEdit/modal";
import ModalTrashedClients from "./ModalTrashed/modal";

export default function ClientDashboard() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [clients, setClients] = useState([]);
  const [toggleAddClient, setToggleAddClient] = useState(false);
  const [toggleEditClient, setToggleEditClient] = useState(false);
  const [editClientId, setEditClientId] = useState();
  const [togglePoubelle, settogglePoubelle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [responseMessage, setResponseMessage] = useState();

  // Open & close Modal Add
  function openAddClient() {
    setToggleAddClient(true);
  }
  function closeAddClient() {
    setToggleAddClient(false);
  }

  // Open & close Modal Edit
  function openEditClient(id) {
    setToggleEditClient(true);
    setEditClientId(id);
  }
  function closeEditClient() {
    setToggleEditClient(false);
  }

  // Open & close Modal Trashed
  function openTrashedClients() {
    settogglePoubelle(true);
  }
  function closeTrashedClients() {
    settogglePoubelle(false);
  }

  // Fetch clients function
  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    fetchClients();
  }, [responseMessage]);

  const fetchClients = () => {
    axios
      .get(`${apiUrl}/api/clients`)
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Delete client function
  function deleteClient(id) {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce client?")) {
      axios
        .delete(`${apiUrl}/api/clients/${id}`)
        .then((response) => {
          setClients((prevClients) =>
            prevClients.filter((client) => client.id !== id)
          );
          setResponseMessage(response.data.message);
          fetchClients();
        })
        .catch((error) => {
          console.error(error);
          setResponseMessage(error.response.data.message);
        });
    }
  }

  // Search bar function
  const filteredClients = clients.filter((client) => {
    return (
      client.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.ville.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Sort clients by id
  const sortedClients = [...filteredClients].sort((a, b) => {
    const nameA = `${a.id}`;
    const nameB = `${b.id}`;
    if (sortOrder === "asc") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
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
          <h6>Dashboard / Clients</h6>
        </div>
        <div className="TitleDashboard formations">
          <h1>Clients</h1>
          <div>
            <button
              className="btnSeeMoreServices"
              title="Ajouter Client"
              onClick={openAddClient}
            >
              <i className="bx bx-plus-medical"></i>
            </button>
            <button
              className="btnSeeMoreServices trash"
              title="Poubelle"
              onClick={openTrashedClients}
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
              placeholder="Chercher (Nom, Prénom, Email, Ville) ..."
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
              {sortedClients.map((client, index) => (
                <tr key={index}>
                  <td>{client.id}</td>
                  <td>
                    <span className="spanNomUppercase">{client.nom}</span>
                  </td>
                  <td>{client.prenom}</td>
                  <td>{client.email}</td>
                  <td>{client.ville}</td>
                  <td>{client.numero_telephone}</td>
                  <td>{client.numero_whatsapp}</td>
                  <td>{client.niveau_etude}</td>
                  <td>{client.experiences_formatives}</td>
                  <td className="tdActions">
                    <div>
                      <button
                        className="btnEdit"
                        onClick={() => openEditClient(client.id)}
                      >
                        <i className="bx bxs-edit-alt"></i>
                      </button>
                      <button
                        className="btnDelete"
                        onClick={() => deleteClient(client.id)}
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
        {responseMessage && <Alert msg={responseMessage} />}
        {toggleAddClient && (
          <ModalAddClient
            onClose={closeAddClient}
            setResponseMessage={setResponseMessage}
          />
        )}
        {toggleEditClient && (
          <ModalEditClient
            clientId={editClientId}
            onClose={closeEditClient}
            setResponseMessage={setResponseMessage}
          />
        )}
        {togglePoubelle && (
          <ModalTrashedClients
            onClose={closeTrashedClients}
            setResponseMessage={setResponseMessage}
          />
        )}
      </div>
    </Fragment>
  );
}
