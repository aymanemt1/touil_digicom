import React, { Fragment, useEffect, useState } from "react";
import "./modal.css";
import axios from "axios";
import { Alert } from "../../../../../Components/Alert/Alert";

export default function ModalAddFormation({ onClose, setResponseMessage }) {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    titre_fr: "",
    titre_ar: "",
    description_fr: "",
    description_ar: "",
    cover: "",
    affiche: "",
    location: "null",
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
    ville: "",
    capacite: "",
    date_debut: "",
    date_fin: "",
  });

  const [coverPreview, setCoverPreview] = useState(null);
  const [affichePreview, setAffichePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    let error = "";

    if (type === "file") {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
      });

      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          if (name === "cover") {
            setCoverPreview(reader.result);
          }
          if (name === "affiche") {
            setAffichePreview(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      if (value.trim() == "") {
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

    console.log(formData);
    axios
      .post(`${apiUrl}/api/formations`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setFormData({
          titre_fr: "",
          titre_ar: "",
          description_fr: "",
          description_ar: "",
          cover: "",
          affiche: "",
          ville: "",
          capacite: "",
          date_debut: "",
          date_fin: "",
        });
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
            <h1>Ajoute Formation</h1>
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
                    <div>
                      <div className="labelFile">
                        <label htmlFor="cover">
                          <i className="bx bx-cloud-upload"></i>
                          <p className="cheminImageReload">Cover</p>
                        </label>
                        <input
                          type="file"
                          name="cover"
                          id="cover"
                          onChange={handleChange}
                        />
                        {coverPreview && (
                          <img
                            src={coverPreview}
                            alt="Cover"
                            className="imgReloadInput"
                          />
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
                    <div>
                      <div className="labelFile">
                        <label htmlFor="affiche">
                          <i className="bx bx-cloud-upload"></i>{" "}
                          <p className="cheminImageReload">Affiche</p>
                        </label>
                        <input
                          type="file"
                          name="affiche"
                          id="affiche"
                          onChange={handleChange}
                        />
                        {affichePreview && (
                          <img
                            src={affichePreview}
                            alt="affiche"
                            className="imgReloadInput"
                          />
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
                  <td id="tdDouble">
                    <div>
                      <select
                        id="ville"
                        className="input-inscription"
                        name="ville"
                        value={formData.ville}
                        onChange={handleChange}
                      >
                        <option value="" disabled selected>
                          Selectionner une ville
                        </option>
                        <option value="Agadir">Agadir</option>
                        <option value="Al Hoceima">Al Hoceima</option>
                        <option value="Asilah">Asilah</option>
                        <option value="Azemmour">Azemmour</option>
                        <option value="Beni Mellal">Beni Mellal</option>
                        <option value="Bouznika">Bouznika</option>
                        <option value="Casablanca">Casablanca</option>
                        <option value="Chefchaouen">Chefchaouen</option>
                        <option value="Dakhla">Dakhla</option>
                        <option value="El Jadida">El Jadida</option>
                        <option value="Essaouira">Essaouira</option>
                        <option value="Fes">Fes</option>
                        <option value="Fnideq">Fnideq</option>
                        <option value="Guelmim">Guelmim</option>
                        <option value="Ifrane">Ifrane</option>
                        <option value="Kénitra">Kénitra</option>
                        <option value="Khouribga">Khouribga</option>
                        <option value="Laayoune">Laayoune</option>
                        <option value="Larache">Larache</option>
                        <option value="Marrakech">Marrakech</option>
                        <option value="Meknes">Meknes</option>
                        <option value="Mohammedia">Mohammedia</option>
                        <option value="Nador">Nador</option>
                        <option value="Ouarzazate">Ouarzazate</option>
                        <option value="Oujda">Oujda</option>
                        <option value="Rabat">Rabat</option>
                        <option value="Safi">Safi</option>
                        <option value="Salé">Salé</option>
                        <option value="Tanger">Tanger</option>
                        <option value="Taroudant">Taroudant</option>
                        <option value="Taza">Taza</option>
                        <option value="Témara">Témara</option>
                        <option value="Tetouan">Tetouan</option>
                        <option value="Tiznit">Tiznit</option>
                      </select>
                      {errors.ville && (
                        <span className="errorModal">
                          <i className="bx bxs-error"></i> {errors.ville}
                        </span>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
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
                    <input type="submit" value="Ajoute" id="btnAjoute" />
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
