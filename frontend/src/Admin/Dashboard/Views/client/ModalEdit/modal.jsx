import React, { Fragment, useState, useEffect } from "react";
import "./modal.css";
import axios from "axios";
import { Alert } from "../../../../../Components/Alert/Alert";

export default function ModalEditClient({ clientId, onClose, setResponseMessage }) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch client data based on clientId and set formData
    axios.get(`http://127.0.0.1:8000/api/clients/${clientId}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error("Error fetching client data:", error);
      });
  }, [clientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let isValid = true;
    const newErrors = {};
  
    for (const key in formData) {
      if (typeof formData[key] === 'string' && formData[key].trim() === "") {
        newErrors[key] = "Ce champ est obligatoire";
        isValid = false;
      }
    }
  
    if (!isValid) {
      setErrors(newErrors);
      return;
    }
  
    axios
      .put(`http://127.0.0.1:8000/api/clients/${clientId}`, formData)
      .then((response) => {
        setResponseMessage(response.data.message);
        onClose();
      })
      .catch((error) => {
        if (error.response) {
          setErrors({
            ...errors,
            email: "Email déjà existant",
          });
        } else {
          console.error(error);
        }
      });
  };
  

  return (
    <Fragment>
      <div className="parentModalAddFormation">
        <div className="modalAddFormation">
          <div className="headerModal">
            <h1>Modifier Client</h1>
            <button onClick={onClose}>
              <i className="bx bx-x"></i>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <table cellSpacing="15">
            <tbody>
                <tr>
                  <td>
                  <label className="label_edit">Nom</label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Nom"
                    />
                    {errors.nom && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.nom}
                      </span>
                    )}
                  </td>
                  <td>
                    <label className="label_edit">Prenom</label>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      placeholder="Prénom"
                    />
                    {errors.prenom && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.prenom}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="label_edit">Date de naissance</label>
                    <input
                      type="date"
                      name="date_naissance"
                      value={formData.date_naissance}
                      onChange={handleChange}
                      placeholder="Date de naissance"
                    />
                    {errors.date_naissance && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.date_naissance}
                      </span>
                    )}
                  </td>
                  <td>
                    <label className="label_edit">Ville</label>
                    <input
                      type="text"
                      name="ville"
                      value={formData.ville}
                      onChange={handleChange}
                      placeholder="Ville"
                    />
                    {errors.ville && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.ville}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="label_edit">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                    {errors.email && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.email}
                      </span>
                    )}
                  </td>
                  <td>
                    <label className="label_edit">Telephone</label>
                    <input
                      type="text"
                      name="numero_telephone"
                      value={formData.numero_telephone}
                      onChange={handleChange}
                      placeholder="Numéro de téléphone"
                    />
                    {errors.numero_telephone && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.numero_telephone}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="label_edit">Whatsapp</label>
                    <input
                      type="text"
                      name="numero_whatsapp"
                      value={formData.numero_whatsapp}
                      onChange={handleChange}
                      placeholder="Numéro WhatsApp"
                    />
                    {errors.numero_whatsapp && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.numero_whatsapp}
                      </span>
                    )}
                  </td>
                  <td>
                    <label className="label_edit">Niveau D'etude</label>
                    <input
                      type="text"
                      name="niveau_etude"
                      value={formData.niveau_etude}
                      onChange={handleChange}
                      placeholder="Niveau d'étude"
                    />
                    {errors.niveau_etude && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.niveau_etude}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <label className="label_edit">Experiences Formatives</label>
                    <input
                      name="experiences_formatives"
                      value={formData.experiences_formatives}
                      onChange={handleChange}
                      placeholder="Expériences formatives"
                    />
                    {errors.experiences_formatives && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.experiences_formatives}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="tdBtnAjoute">
                    <input type="submit" value="Ajouter" id="btnAjoute" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
