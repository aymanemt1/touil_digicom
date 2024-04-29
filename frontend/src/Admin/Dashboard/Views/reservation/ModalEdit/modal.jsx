import React, { Fragment, useEffect, useState } from "react";
import "./modal.css";
import axios from "axios";
import { Alert } from "../../../../../Components/Alert/Alert";

export default function ModalEditReservation({
  onClose,
  reservationId,
  setResponseMessage,
}) {
  const [formations, setFormations] = useState([]);
  const [clients, setClients] = useState([]);

  const [formData, setFormData] = useState({
    client_id: "",
    formation_id: "",
    date_validation: "",
    prix: "",
    time_validation: "",
  });

  const [errors, setErrors] = useState({
    client_id: "",
    formation_id: "",
    date_validation: "",
    prix: "",
    time_validation: "",
  });


  console.log(formations);

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
    axios
      .get(`http://127.0.0.1:8000/api/reservations/${reservationId}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [reservationId]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let selectedValue = value;

    if (type === "select-one") {
      selectedValue = e.target.options[e.target.selectedIndex].value;
    }

    let error = "";

    setFormData((prevState) => ({
      ...prevState,
      [name]: selectedValue,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const dateValidation = new Date(formData.date_validation);
    const dateDebutFormation = new Date(
      formations.find((f) => f.id === formData.formation_id)?.date_debut
    ); 

    if (dateValidation < currentDate || dateValidation > dateDebutFormation) {
      alert(
        "Date de validation invalide. Assurez-vous que la date est postérieure à la date actuelle et antérieure à la date de début de la formation."
      );
      return;
    }

    let isValid = true;
    const newErrors = { ...errors };

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
      .put(`http://127.0.0.1:8000/api/reservations/${reservationId}`, formData)
      .then((response) => {
        setResponseMessage(response.data.message);
        onClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <Fragment>
      <div className="parentModalAddFormation">
        <div className="modalAddFormation">
          <div className="headerModal">
            <h1>Modifier Reservation</h1>
            <button onClick={onClose}>
              <i className="bx bx-x"></i>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <table cellSpacing="15">
              <tbody>
                <tr>
                  <td>
                  <label className="label_edit">Formation</label>
                    <select
                      className="selectModal"
                      value={formData.formation_id}
                      name="formation_id"
                      onChange={handleChange}
                    >
                      <option value="" hidden>Formation</option>
                      {formations.map((item, index) => {
                        const startDate = formatDate(new Date(item.date_debut));
                        return (
                          <option value={item.id} key={index}>
                            {item.id} - {item.titre_fr} - {startDate}
                          </option>
                        );
                      })}
                    </select>
                    {errors.formation_id && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.formation_id}
                      </span>
                    )}
                  </td>
                  <td>
                    <label className="label_edit">Prix</label>
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
                </tr>
                <tr>
                  <td>
                    <label className="label_edit">Date validation</label>
                    <input
                      type="text"
                      name="date_validation"
                      value={formData.date_validation}
                      onChange={handleChange}
                      placeholder="Date de validation"
                    />
                    {errors.date_validation && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i>{" "}
                        {errors.date_validation}
                      </span>
                    )}
                  </td>
                  <td>
                    <label className="label_edit">Heure de confirmation</label>
                    <input
                      type="text"
                      name="time_validation"
                      value={formData.time_validation}
                      onChange={handleChange}
                      placeholder="Time Validation"
                    />
                    {errors.time_validation && (
                      <span className="errorModal">
                        <i className="bx bxs-error"></i> {errors.time_validation}
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
