import React, { Fragment, useEffect, useState } from "react";
import "./modal.css";
import axios from "axios";

export default function ModalEditFormateur({
  onClose,
  formateurId,
  setResponseMessage,
}) {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    specialite: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    nom: "",
    prenom: "",
    email: "",
    specialite: "",
  });

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/formateurs/${formateurId}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [formateurId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.put(
        `${apiUrl}/api/formateurs/${formateurId}`,
        formData
      );
      setResponseMessage(response.data.message);
      onClose();
      console.log(response);
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
