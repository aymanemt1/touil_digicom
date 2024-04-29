import React, { Fragment, useEffect, useState } from "react";
import "./modal.css";
import axios from "axios";
import { Alert } from "../../../../../Components/Alert/Alert";

export default function ModalAddModule({ onClose, setResponseMessage }) {
  const [formations, setFormations] = useState([]);
  const [formateurs, setFormateurs] = useState([]);

  const [formData, setFormData] = useState({
    titre_fr: "",
    titre_ar: "",
    duree: "",
    formateur_id: "",
    formation_id: "",
    prix: "",
  });

  const [errors, setErrors] = useState({
    titre_fr: "",
    titre_ar: "",
    duree: "",
    formateur_id: "",
    formation_id: "",
    prix: "",
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/formations/")
      .then((response) => {
        setFormations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("http://127.0.0.1:8000/api/formateurs/")
      .then((response) => {
        setFormateurs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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

    let isValid = true;
    const newErrors = { ...errors };

    for (const key in formData) {
      if (formData[key].trim() === "") {
        newErrors[key] = "Ce champ est obligatoire";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    axios
      .post(`http://127.0.0.1:8000/api/modules`, formData)
      .then((response) => {
        setResponseMessage(response.data.message);
        onClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Fragment>
      <div className="parentModalAddFormation">
        <div className="modalAddFormation">
          <div className="headerModal">
            <h1>Ajouter Module</h1>
            <button onClick={onClose}>
              <i className="bx bx-x"></i>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <table cellSpacing="15">
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="titre_fr"
                      onChange={handleChange}
                      placeholder="Titre (fr)"
                    />
                    {errors.titre_fr && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.titre_fr}
                      </span>
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      name="titre_ar"
                      onChange={handleChange}
                      placeholder="Titre (ar)"
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
                    <select
                      name="formation_id"
                      className="selectModal"
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
                    <select
                      name="formateur_id"
                      className="selectModal"
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
                    <input
                      type="number"
                      name="duree"
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
                    <input
                      type="text"
                      name="prix"
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
