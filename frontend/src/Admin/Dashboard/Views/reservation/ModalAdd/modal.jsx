import React, { Fragment, useEffect, useState } from "react";
import "./modal.css";
import axios from "axios";
import { Alert } from "../../../../../Components/Alert/Alert";

export default function ModalAddReservation({ onClose, setResponseMessage }) {

  const [formations, setFormations] = useState([]);
  const [clients, setClients] = useState([]);

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  

  const [formData, setFormData] = useState({
    formation_id: "",
    client_id: "",
    date_validation: "",
    prix: "",
    validate: false,
    timeValidation: "",
  });
  const [errors, setErrors] = useState({
    formation_id: "",
    client_id: "",
    date_validation: "",
    prix: "",
    validate: "",
    timeValidation: "",
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
    .get("http://127.0.0.1:8000/api/clients/")
    .then((response) => {
      setClients(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target; 
    
    let selectedValue;
    if (type === "checkbox") {
      selectedValue = checked;
    } else {
      selectedValue = value;
    }
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedValue,
    }));
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: typeof selectedValue === 'string' && selectedValue.trim() === "" && name !== "validate" ? "Ce champ est obligatoire" : "",
    }));
  
    if (name === "formation_id") {
      const selectedFormation = formations.find((formation) => formation.id == selectedValue);
      if (selectedFormation) {
        const currentDate = new Date();
        const minDate = currentDate.toISOString().split('T')[0]; 
        const maxDate = selectedFormation.date_debut; 
  
        setMinDate(minDate);
        setMaxDate(maxDate);
      }
    }
  };
  


  const checkReservation = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/check-reservation?client_id=${formData.client_id}&formation_id=${formData.formation_id}`);
      return response.data.exists; 
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let isValid = true;
    const newErrors = { ...errors };


    const reservationExists = await checkReservation();

    if (reservationExists) {
      window.alert("Ce client a déjà réservé cette formation.");
      return;
    }
  
    const currentDate = new Date();
    const selectedDate = new Date(formData.date_validation);
    const selectedTime = formData.timeValidation.split(":");
    const selectedDateTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), selectedTime[0], selectedTime[1]);
  
    if (selectedDateTime < currentDate || selectedDateTime > new Date(maxDate)) {
      window.alert("La date de validation doit être entre la date actuelle et la date de début de la formation.");
      isValid = false;
    }
  
    for (const key in formData) {
      if (typeof formData[key] === "string" && formData[key].trim() === "") {
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
      .post("http://127.0.0.1:8000/api/reservations", formData)
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
            <h1>Ajouter Reservation</h1>
            <button onClick={onClose}>
              <i className="bx bx-x"></i>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <table cellSpacing="15">
              <tbody>
                <tr>
                  <td>
                    <select
                      className="selectModal"
                      value={formData.client_id}
                      name="client_id"
                      onChange={handleChange}
                    >
                      <option value="" hidden>Client</option>
                      {clients.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.id} - {item.nom}  {item.prenom}
                        </option>
                      ))}
                    </select>
                    {errors.client_id && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.client_id}
                      </span>
                    )}
                  </td>
                  <td>
                    <select
                      className="selectModal"
                      value={formData.formation_id}
                      name="formation_id"
                      onChange={handleChange}
                    >
                    <option value="" hidden>Formation</option>
                      {formations.map((item, index) => (
                        <option value={item.id} key={index}>
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
                </tr>
                <tr>
                  <td>
                  <input
  type="date"
  name="date_validation"
  value={formData.date_validation}
  onChange={handleChange}
  placeholder="Date de validation"
  min={minDate}
  max={maxDate}
/>
                    {errors.date_validation && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.date_validation}
                      </span>
                    )}
                  </td>
                  <td>
                    <input
                      type=""
                      name="timeValidation"
                      value={formData.timeValidation}
                      onChange={handleChange}
                      placeholder="Time Validation"
                    />
                    {errors.timeValidation && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.timeValidation}
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                <td>
                    <input
                      type="number"
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
                  <td className="tdValidated"> 
                    <label>Valide</label>
                    <input
                      type="checkbox"
                      name="validate"
                      checked={formData.validate}
                      onChange={handleChange}
                      />
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
