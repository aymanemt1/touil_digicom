import React, { Fragment, useEffect, useState } from "react";
import "./modal.css";
import axios from "axios";

export default function ModalEditFormateur({ onClose, formateurId, setResponseMessage }) {
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


  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/formateurs/${formateurId}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [formateurId]);




  
  const [profilePreview, setProfilePreview] = useState(null);


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    let error = "";
  
    if (type === "file") {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file ? file.name : null, 
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
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/formateurs/${formateurId}`, formData);
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
            <h1>Modifier Formateur</h1>
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
                    <label className="label_edit">Specialite</label>
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
                  <label className="label_edit">Profile</label>
                    <div className="labelFile">
                      <label htmlFor="profile">
                        <i className="bx bx-cloud-upload"></i> { formData.profile ? formData.profile : 'Profile' }
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
