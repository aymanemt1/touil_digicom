import React, { Fragment, useEffect, useState } from "react";
import "./modal.css";
import axios from "axios";
import { Alert } from "../../../../../Components/Alert/Alert";

export default function ModalAddReservation({ onClose, setResponseMessage }) {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [formations, setFormations] = useState([]);
  const [clients, setClients] = useState([]);

  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const [formData, setFormData] = useState({
    formation_id: "",
    client_id: "",
    date_validation: "",
    time_validation: "",
  });
  const [errors, setErrors] = useState({
    formation_id: "",
    client_id: "",
    date_validation: "",

    time_validation: "",
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
      .get(`${apiUrl}/api/clients/`)
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
      [name]: typeof selectedValue === "string" && selectedValue.trim() === "",
    }));

    if (name === "formation_id") {
      const selectedFormation = formations.find(
        (formation) => formation.id == selectedValue
      );
      if (selectedFormation) {
        const currentDate = new Date();
        const minDate = currentDate.toISOString().split("T")[0];
        const maxDate = selectedFormation.date_debut;

        setMinDate(minDate);
        setMaxDate(maxDate);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { ...errors };

    const currentDate = new Date();
    const selectedDate = new Date(formData.date_validation);
    const selectedDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

    if (
      selectedDateTime < currentDate ||
      selectedDateTime > new Date(maxDate)
    ) {
      window.alert(
        "La date de validation doit être entre la date actuelle et la date de début de la formation."
      );
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
      .post(`${apiUrl}/api/reservations`, formData)
      .then((response) => {
        console.log(response.data);
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
                      <option value="" hidden>
                        Client
                      </option>
                      {clients.map((item, index) => (
                        <option value={item.id} key={index}>
                          {item.id} - {item.nom} {item.prenom}
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
                      <option value="" hidden>
                        Formation
                      </option>
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
                        <i className="bx bxs-error"></i>{" "}
                        {errors.date_validation}
                      </span>
                    )}
                  </td>
                  <td>
                    <select
                      id="time"
                      name="time_validation"
                      value={formData.time_validation}
                      onChange={handleChange}
                    >
                      <option value="" selected disabled>
                        <label htmlFor="time">Heur de confirmation :</label>
                      </option>
                      <option value="11:00">11:00</option>
                      <option value="13:00">13:00</option>
                      <option value="15:00">15:00</option>
                      <option value="17:00">17:00</option>
                    </select>
                    {errors.time_validation && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i>{" "}
                        {errors.time_validation}
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
