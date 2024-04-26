import React, { Fragment, useEffect, useState } from "react";
import "./modal.css";
import axios from "axios";
import { Alert } from "../../../../../Components/Alert/Alert";

export default function ModalEditFormation({ onClose, formationId, setResponseMessage }) {
  const [formation, setFormation] = useState();

  const [formData, setFormData] = useState({
    titre_fr: "",
    titre_ar: "",
    description_fr: "",
    description_ar: "",
    cover: "",
    affiche: "",
    localisation: "",
    ville: "",
    capacite: "",
    date_debut: "",
    date_fin: "",
  });

  const [errors, setErrors] = useState({
    titre_fr: "",
    titre_ar: "",
    description_fr: "",
    description_ar: "",
    cover: "",
    affiche: "",
    localisation: "",
    ville: "",
    capacite: "",
    date_debut: "",
    date_fin: "",
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/formations/${formationId}`)
      .then((response) => {
        setFormation(response.data);
        setFormData({
          titre_fr: response.data.titre_fr,
          titre_ar: response.data.titre_ar,
          description_fr: response.data.description_fr,
          description_ar: response.data.description_ar,
          cover: response.data.cover,
          affiche: response.data.affiche,
          localisation: response.data.ville,
          ville: response.data.ville,
          capacite: response.data.capacite,
          date_debut: response.data.date_debut,
          date_fin: response.data.date_fin,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [formationId]);

  const [coverPreview, setCoverPreview] = useState(null);
  const [affichePreview, setAffichePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    let error = "";

    if (type === "file") {
      const allowedExtensions = ["png", "jpeg", "jpg"];
      const file = files[0];
      const extension = file.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(extension)) {
        error = "Veuillez sélectionner un fichier PNG, JPEG ou JPG";
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          if (name === "cover") {
            setCoverPreview(reader.result);
          } else if (name === "affiche") {
            setAffichePreview(reader.result);
          }
          setFormData({
            ...formData,
            [name]: file.name,
          });
        };
        reader.readAsDataURL(file); 
      }
    } else {
      if (value.trim() === "") {
        error = "Ce champ est obligatoire";
      } else if (name === "date_debut" || name === "date_fin") {
        setFormData({
          ...formData,
          [name]: value,
        });
      } else if (name === "date_debut") {
        const currentDate = new Date();
        const selectedDate = new Date(value);
        if (selectedDate <= currentDate) {
          error = "La date de début doit être postérieure à la date actuelle";
        }
      } else if (name === "date_fin") {
        const startDate = new Date(formData.date_debut);
        const endDate = new Date(value);
        if (endDate <= startDate) {
          error = "La date de fin doit être postérieure à la date de début";
        }
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    }

    setErrors({
      ...errors,
      [name]: error,
    });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { ...errors };
  
    const currentDate = new Date();
    const startDate = new Date(formData.date_debut);
    const endDate = new Date(formData.date_fin);
  
    if (startDate <= currentDate) {
      newErrors.date_debut = "La date doit être dans le futur";
      isValid = false;
    }
  
    if (endDate <= startDate) {
      newErrors.date_fin =
        "La date de fin doit être postérieure à la date de début";
      isValid = false;
    }
  
    if (!isValid) {
      setErrors(newErrors);
      return;
    }
  
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/formations/${formationId}`, formData);
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
            <h1>Modifie Formation</h1>
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
                      placeholder="Titre en francais"
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
                      placeholder="Titre en arab"
                    />
                    {errors.titre_ar && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.description_fr}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                  <label className="label_edit">Description(FR)</label>
                    <input
                      type="text"
                      name="description_fr"
                      value={formData.description_fr}
                      onChange={handleChange}
                      placeholder="Description en francais"
                    />
                    {errors.description_fr && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.description_ar}
                      </span>
                    )}
                  </td>
                  <td>
                  <label className="label_edit">Description(AR)</label>
                    <input
                      type="text"
                      name="description_ar"
                      value={formData.description_ar}
                      onChange={handleChange}
                      placeholder="Description en arab"
                    />
                    {errors.description_ar && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.description_ar}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                <td>
                <label className="label_edit">Cover</label>
                    <div>
                      <div className="labelFile">
                        <label htmlFor="cover">
                          <i className="bx bx-cloud-upload"></i> {formData.cover ? <p className="cheminImageReload">{formData.cover}</p> : <p className="cheminImageReload">Cover</p>}
                        </label>
                        <input
                          type="file"
                          name="cover"
                          id="cover"
                          onChange={handleChange}
                        />
                        {coverPreview && (
                          <img src={coverPreview} alt="Cover" className="imgReloadInput"/>
                        )}
                      </div>
                      {errors.cover && (
                        <span className="errorModal">
                          <i className="bx bxs-error"></i> {errors.cover}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                  <label className="label_edit">Affiche</label>
                    <div>
                      <div className="labelFile">
                        <label htmlFor="affiche">
                          <i className="bx bx-cloud-upload"></i> {formData.affiche ? <p className="cheminImageReload">{formData.affiche}</p> : <p className="cheminImageReload">Affiche</p>}
                        </label>
                        <input
                          type="file"
                          name="affiche"
                          id="affiche"
                          onChange={handleChange}
                        />
                        {affichePreview && (
                          <img src={affichePreview} alt="affiche" className="imgReloadInput"/>
                        )}
                      </div>
                      {errors.affiche && (
                        <span className="errorModal">
                          <i className="bx bxs-error"></i> {errors.affiche}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                  <label className="label_edit">Localisation</label>
                    <input
                      type="text"
                      name="localisation"
                      value={formData.localisation}
                      onChange={handleChange}
                      placeholder="Localisation"
                    />
                    {errors.localisation && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.localisation}
                      </span>
                    )}
                  </td>
                  <td id="tdDouble">
                  <label className="label_edit">Ville</label>
                    <div>
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
                    </div>
                    <div>
                    <label className="label_edit">Capacite</label>
                      <input
                        type="number"
                        name="capacite"
                        value={formData.capacite}
                        onChange={handleChange}
                        placeholder="Capacite"
                      />
                      {errors.capacite && (
                        <span className="errorModal">
                          <i className="bx bxs-error"></i> {errors.capacite}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                  <label className="label_edit">Date debut</label>
                    <input
                      type="datetime-local"
                      name="date_debut"
                      value={formData.date_debut}
                      onChange={handleChange}
                      placeholder="Date debut"
                      className="inputDateTime"
                    />
                    {errors.date_debut && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.date_debut}
                      </span>
                    )}
                  </td>
                  <td>
                  <label className="label_edit">Date fin</label>
                    <input
                      type="datetime-local"
                      name="date_fin"
                      value={formData.date_fin}
                      onChange={handleChange}
                      placeholder="Date fin"
                      className="inputDateTime"
                    />
                    {errors.date_fin && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.date_fin}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="tdBtnAjoute">
                    <input type="submit" value="Modifie" id="btnAjoute" />
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
