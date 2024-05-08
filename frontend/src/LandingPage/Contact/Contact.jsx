import React, { useContext, useState } from "react";
import "./Contact.css";
import Navbar from "../Navbar/navbar";
import { Footer } from "../Footer/footer";
import { LangueContext } from "../../Context/LangueContext";
import { Translate } from "./contacttranslate";
import axios from "axios";
import { Alert } from "../../Components/Alert/Alert";

export const Contact = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  document.title = "Touil digicom - Contact";

  const { langue } = useContext(LangueContext);

  const contact = Translate.Contact.find((lang) => lang.id == langue);

  const [formData, setformData] = useState({
    nom: "",
    prenom: "",
    email: "",
    message_contact: "",
  });
  const [clicked, setclicked] = useState(false);
  const [Errors, setErrors] = useState({});
  const [responsemessage, setresponsemessage] = useState("");

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...Errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const validationErrors = {};

    if (formData.nom.trim() === "") {
      validationErrors.nom = contact.errors.nom[0];
    } else if (/\d/.test(formData.nom)) {
      validationErrors.nom = contact.errors.nom[1];
    }
    if (formData.prenom.trim() === "") {
      validationErrors.prenom = contact.errors.prenom[0];
    } else if (/\d/.test(formData.prenom)) {
      validationErrors.prenom = contact.errors.prenom[1];
    }
    if (formData.email.trim() === "") {
      validationErrors.email = contact.errors.email[0];
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = contact.errors.email[1];
    }
    if (formData.message_contact.trim() === "") {
      validationErrors.message_contact = contact.errors.message_contact[0];
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setclicked(true);

    if (!validateForm()) {
      return;
    }
    const isFormValid = validateForm();

    if (isFormValid) {
      setresponsemessage("E-mail envoyé avec succès");
    }
    try {
      const response = await axios.post(`${apiUrl}/api/send-email`, formData);
      if (response.status === 500) {
        setresponsemessage("Error !");
      }
      console.log(response);
      setformData({
        nom: "",
        prenom: "",
        email: "",
        message_contact: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="contactParent">
      <div className="contact">
        <div className="contact-header">
          <div className="contact-title">
            <p> {contact.sous_title}</p>
            <h2>{contact.title}</h2>
          </div>
          <div className="contact-text">{contact.text}</div>
        </div>

        <div className="contact-main">
          <div className="contact-info">
            <div className="adress">
              <div id="contact-icon">
                <i className="bx bx-current-location"></i>
              </div>
              <div id="contact-info">
                {" "}
                <h3>{contact.adress}</h3>
                <p>Boulevard Mohammed V, Technopark Tangier 90000 </p>
              </div>
            </div>
            <div className="telephone">
              <div id="contact-icon">
                <i class="bx bxs-phone-call"></i>
              </div>
              <div id="contact-info">
                <h3>{contact.Téléphone}</h3>
                <p>212 628.79.45.01 - 212 711-172764</p>
              </div>
            </div>
            <div className="e-mail">
              <div id="contact-icon">
                <i className="bx bxs-envelope"></i>
              </div>
              <div id="contact-info">
                <h3>{contact.email}</h3>
                <p>contact@touildigicom.ma</p>
              </div>
            </div>
          </div>
          <div
            className="contact-map"
            id={clicked && !responsemessage ? "after-validation" : ""}
          >
            <div className="contact-forms">
              <h1>{contact.contact_title}</h1>
              <form onSubmit={handleSubmit}>
                <div className="wave-group">
                  <input
                    name="nom"
                    type="text"
                    placeholder={contact.nom}
                    value={formData.nom}
                    onChange={handleChange}
                    className="input-contact"
                  />
                  {Errors.nom && (
                    <span className="errorMessage">
                      {Errors.nom} <i className="bx bxs-error"></i>
                    </span>
                  )}
                  <input
                    name="prenom"
                    type="text"
                    placeholder={contact.prenom}
                    value={formData.prenom}
                    onChange={handleChange}
                    className="input-contact"
                  />
                  {Errors.prenom && (
                    <span className="errorMessage">
                      {Errors.prenom} <i className="bx bxs-error"></i>
                    </span>
                  )}
                  <input
                    name="email"
                    type="text"
                    placeholder={contact.email}
                    value={formData.email}
                    onChange={handleChange}
                    className="input-contact"
                  />
                  {Errors.email && (
                    <span className="errorMessage">
                      {Errors.email} <i className="bx bxs-error"></i>
                    </span>
                  )}
                  <input
                    name="message_contact"
                    type="text"
                    placeholder={contact.msg}
                    value={formData.message_contact}
                    onChange={handleChange}
                    className="input-contact"
                  />
                  {Errors.message_contact && (
                    <span className="errorMessage">
                      {Errors.message_contact} <i className="bx bxs-error"></i>
                    </span>
                  )}
                </div>
                <button
                  className="contact-button"
                  value={contact.btn}
                  type="submit"
                  role="button"
                >
                  {contact.btn}
                </button>
                {responsemessage && <Alert msg={responsemessage} />}
              </form>
            </div>
            <div className="google-map">
              <iframe
                className="map"
                id={clicked && !responsemessage ? "after-validation" : ""}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.9774884554645!2d-5.805697525780093!3d35.775929324768725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0c7f580f56224f%3A0x10633cdbe9d95d5b!2sTechnopark!5e0!3m2!1sen!2sma!4v1713175648227!5m2!1sen!2sma"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
