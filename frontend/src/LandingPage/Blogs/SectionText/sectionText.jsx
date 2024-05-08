import { Fragment, useContext, useRef, useState } from "react";
import { SectionTextTranslate } from "./sectionText_Translate";
import "./sectionText.css";
import { LangueContext } from "../../../Context/LangueContext";
import axios from "axios";
import { Alert } from "../../../Components/Alert/Alert";

export default function SectionText() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const { langue } = useContext(LangueContext);

  const sectionData = SectionTextTranslate.sectionText.find(
    (item) => item.id == langue
  );

  const [Email, setEmail] = useState("");
  const [Errors, setErrors] = useState({});
  const [responsemessage, setresponsemessage] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...Errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const validationErrors = {};
    if (Email.trim() === "") {
      validationErrors.Email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(Email)) {
      validationErrors.Email = "L'email doit être valide";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    const isFormValid = validateForm();

    if (isFormValid) {
      setresponsemessage("E-mail envoyé avec succès");
    }
    try {
      const response = await axios.post(`${apiUrl}/api/subscribe`, { Email });
      setEmail("");
      console.log(response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <Fragment>
      <div className="parentSectionText" data-aos="zoom-in" duration="2500">
        <div className="rowTextBlogs">
          <h1>{sectionData.title}</h1>
        </div>
        <div
          className={
            langue == "fr"
              ? "rowinputsSectionText"
              : "rowinputsSectionText rowinputsSectionTextAr"
          }
        >
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={sectionData.inputEmail}
              onChange={handleChange}
              name="email_subscribe"
              value={Email}
            />

            <input
              type="submit"
              value={sectionData.inputSubmit}
              id="submitSectionText"
            />
          </form>
          <div>
            {Errors.Email && (
              <span className="errorMessage">
                {Errors.Email} <i className="bx bxs-error"></i>
              </span>
            )}
          </div>
        </div>
      </div>
      {responsemessage && <Alert msg={responsemessage} />}
    </Fragment>
  );
}
