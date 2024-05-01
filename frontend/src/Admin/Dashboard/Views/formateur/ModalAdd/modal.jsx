import React, { Fragment, useState } from "react";
import "./modal.css";
import axios from "axios";
import { Alert } from "../../../../../Components/Alert/Alert";

export default function ModalAddFormateur({ onClose, setResponseMessage }) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    specialite: "",
    email: "",
    profile: "",
  });

  const [errors, setErrors] = useState({
    nom: "",
    prenom: "",
    email: "",
    specialite: "",
    profile: "",
  });

  const [profilePreview, setProfilePreview] = useState(null);



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
          if (name === "profile") {
            setProfilePreview(reader.result);
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      if (value.trim() === "") {
        error = "Ce champ est obligatoire";
      }
      setFormData({
        ...formData,
        [name]: value,
      });
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
  
    for (const key in formData) {
      if (key !== "profile") {
        if (formData[key].trim() === "") {
          newErrors[key] = "Ce champ est obligatoire";
          isValid = false;
        } else {
          newErrors[key] = "";
        }
      }
    }
  
    if (!isValid) {
      setErrors(newErrors);
      return;
    }
  
    const formDataWithFile = new FormData();
    formDataWithFile.append('nom', formData.nom);
    formDataWithFile.append('prenom', formData.prenom);
    formDataWithFile.append('email', formData.email);
    formDataWithFile.append('specialite', formData.specialite);
    formDataWithFile.append('profile', formData.profile);
  
    console.log(formDataWithFile);
  
    axios
      .post("https://touildigicom.ma/api/formateurs", formDataWithFile, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          specialite: "",
          profile: "",
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
            <h1>Ajouter Formateur</h1>
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
                      placeholder="Prenom"
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
                      name="specialite"
                      value={formData.specialite}
                      onChange={handleChange}
                      placeholder="Specialité"
                    />
                    {errors.specialite && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.specialite}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <div className="labelFile">
                      <label htmlFor="profile">
                        <i className="bx bx-cloud-upload"></i> Profile 
                        {profilePreview && (
                          <img src={profilePreview} alt="Profile Preview" className="imgReloadInput"/>
                        )}
                      </label>
                      <input
                        type="file"
                        name="profile"
                        id="profile"
                        onChange={handleChange}
                        className="inputFile"
                      />
                      {errors.profile && (
                        <span className="errorModal">
                          <i className="bx bxs-error"></i> {errors.profile}
                        </span>
                      )}
                    </div>
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
