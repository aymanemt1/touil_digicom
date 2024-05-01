import React, { Fragment, useState } from "react";
import "./modal.css";
import axios from "axios";
import { Alert } from "../../../../../Components/Alert/Alert";

export default function ModalAddClient({ onClose, setResponseMessage }) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    ville: "",
    email: "",
    numero_telephone: "",
    numero_whatsapp: "",
    niveau_etude: "",
    experiences_formatives: "",
  });

  const [errors, setErrors] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    ville: "",
    email: "",
    numero_telephone: "",
    numero_whatsapp: "",
    niveau_etude: "",
    experiences_formatives: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (value.trim() === "") {
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
      .post("https://touildigicom.ma/api/clients", formData)
      .then((response) => {
        setFormData({
          nom: "",
          prenom: "",
          date_naissance: "",
          ville: "",
          email: "",
          numero_telephone: "",
          numero_whatsapp: "",
          niveau_etude: "",
          experiences_formatives: "",
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
            <h1>Ajouter Client</h1>
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
                  <select
        id="ville"
        className="input-inscription"
        name="ville"
        value={formData.ville}
        onChange={handleChange}
    >
        <option value="" disabled selected>Selectionner une ville</option>
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
                  </td>
                </tr>
                <tr>
                  <td>
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
