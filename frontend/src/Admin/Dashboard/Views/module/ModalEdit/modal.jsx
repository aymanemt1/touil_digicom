import React, { Fragment, useEffect, useState } from "react";
import "./modal.css";
import axios from "axios";

export default function ModalEditModule({ onClose, moduleId, setResponseMessage }) {

  const apiUrl = process.env.REACT_APP_API_URL;


  const [formations, setFormations] = useState([]);
  const [formateurs, setFormateurs] = useState([]);

  const [formData, setFormData] = useState({
    titre_fr: "",
    titre_ar: "",
    formation_id: "",
    formateur_id: "",
    duree: "",
    prix: "",
  });

  const [errors, setErrors] = useState({
    titre_fr: "",
    titre_ar: "",
    formation_id: "",
    formateur_id: "",
    duree: "",
    prix: "",
  });

  useEffect(() => {
    axios
    .get(`${apiUrl}/api/formations/`)
    .then((response) => {
      setFormations(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
    axios
    .get(`${apiUrl}/api/formateurs/`)
    .then((response) => {
      setFormateurs(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
    axios
    .get(`${apiUrl}/api/modules/${moduleId}`)
    .then((response) => {
      setFormData(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }, [moduleId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (value.trim() === "" && name !== "formation_id" && name !== "formateur_id") {
      error = "Ce champ est obligatoire";
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: error,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${apiUrl}/api/modules/${moduleId}`, formData);
      setResponseMessage(response.data.message);
      onClose(); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <div className="parentModalAddFormation">
        <div className="modalAddFormation">
          <div className="headerModal">
            <h1>Modifier Module</h1>
            <button onClick={onClose}>
              <i className="bx bx-x"></i>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
          <table cellSpacing="15">
              <tbody>
                <tr>
                  <td>
                    <label className="label_edit">Titre(FR)</label>
                    <input
                      type="text"
                      name="titre_fr"
                      value={formData.titre_fr}
                      onChange={handleChange}
                      placeholder="Titre (FR)"
                    />
                    {errors.titre_fr && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.titre_fr}
                      </span>
                    )}
                  </td>
                  <td>
                    <label className="label_edit">Titre(AR)</label>
                    <input
                      type="text"
                      name="titre_ar"
                      value={formData.titre_ar}
                      onChange={handleChange}
                      placeholder="Titre (AR)"
                    />
                    {errors.titre_ar && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.titre_ar}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="label_edit">Formation</label>
                    <select
                      name="formation_id"
                      className="selectModal"
                      value={formData.formation_id}
                      onChange={handleChange}
                    >
                      <option value="" hidden>
                        Formation
                      </option>
                      {formations.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.id} - {item.titre_fr}
                        </option>
                      ))}
                    </select>
                    {errors.formation_id && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.formation_id}
                      </span>
                    )}
                  </td>
                  <td>
                    <label className="label_edit">Formateur</label>
                    <select
                      name="formateur_id"
                      className="selectModal"
                      value={formData.formateur_id}
                      onChange={handleChange}
                    >
                      <option value="" hidden>
                        Formateur
                      </option>
                      {formateurs.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.id} - {item.nom} {item.prenom}
                        </option>
                      ))}
                    </select>
                    {errors.formateur_id && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.formateur_id}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="label_edit">Duree</label>
                    <input
                      type="number"
                      name="duree"
                      value={formData.duree}
                      onChange={handleChange}
                      placeholder="Duree"
                    />
                    {errors.duree && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.duree}
                      </span>
                    )}
                  </td>
                  <td>
                    <label className="label_edit">Prix</label>
                    <input
                      type="text"
                      name="prix"
                      value={formData.prix}
                      onChange={handleChange}
                      placeholder="Prix"
                    />
                    {errors.prix && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.prix}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="tdBtnAjoute">
                    <input type="submit" value="Modifier" id="btnAjoute" />
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
