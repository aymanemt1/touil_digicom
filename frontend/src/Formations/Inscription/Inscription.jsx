import React, { useContext, useEffect, useState } from "react";
import "./Inscription.css";
import { LangueContext } from "../../Context/LangueContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Form } from "react-router-dom";
import { Validation } from "../Validation/Validation";
import { Alert } from "../../Components/Alert/Alert";
import { Translate } from "./InscriptionTranslate";
export const Inscription = () => {
  const {
    valuesModel,
    selectAll,
    setvalidationScreen,
    validationScreen,
    reserved,
    langue,
  } = useContext(LangueContext);
  const [Errors, setErrors] = useState({});
  const [clicked, setclicked] = useState(false);
  const [formations, setformations] = useState([]);


  
  console.log(formations);

  const [responsemessage, setresponsemessage] = useState("");

  const { id } = useParams();


  const Inscription = Translate.inscription.find((lang) => lang.id == langue);

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    telephone: "",
    email: "",
    ville: "",
    date_naissance: "",
    numero_whatsapp: "",
    niveau_etude: "",
    experiences_formatives: "",
    formationId: id,
    valuesModel: valuesModel,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ ...Errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setclicked(true);

    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/sendmailvalidation",
        {
          email: formData.email,
          formationId: formData.formationId,
        }
      );
      if (
        response.data.message === "Le client a déjà réservé cette formation"
      ) {
        setvalidationScreen(false);
        setresponsemessage(response.data.message);
      } else if (
        response.data.message === "Le client n'a pas réservé cette formation"
      ) {
        setvalidationScreen(true);
      } else {
        setvalidationScreen(true);
      }
    } catch (error) {
      console.error("Error fetching formation data:", error);
    }
  };

  const validateForm = () => {
    const validationErrors = {};

    if (formData.nom.trim() === "") {
      validationErrors.nom = "Le nom est requis";
    } else if (/\d/.test(formData.nom)) {
      validationErrors.nom = "Le nom ne doit pas contenir de chiffres";
    }
    if (formData.prenom.trim() === "") {
      validationErrors.prenom = "Le prénom est requis";
    } else if (/\d/.test(formData.prenom)) {
      validationErrors.prenom = "Le prénom ne doit pas contenir de chiffres";
    }
    if (formData.email.trim() === "") {
      validationErrors.email = `L'email est requis`;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "L'email n'est pas valide";
    }

    if (formData.ville.trim() === "") {
      validationErrors.ville = "La ville est requise";
    }
    if (isNaN(formData.telephone)) {
      validationErrors.telephone = "Le téléphone doit être un nombre";
    }
    if (formData.telephone.trim() === "") {
      validationErrors.telephone = "Le numéro de téléphone est requis";
    }
    if (isNaN(formData.numero_whatsapp)) {
      validationErrors.numero_whatsapp =
        "Le numéro Whatsapp doit être un nombre";
    }

    if (formData.date_naissance.trim() === "") {
      validationErrors.date_naissance = "La date de naissance est requise";
    } else {
      const currentDate = new Date();
      const birthDate = new Date(formData.date_naissance);
      if (birthDate > currentDate) {
        validationErrors.date_naissance =
          "La date de naissance ne peut pas être dans le futur";
      }
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const getallformations = async () => {
    try {
      axios
        .get(`http://127.0.0.1:8000/api/formations/${id}`)
        .then((response) => {
          setformations(response.data);
        })
        .catch((error) => {
          console.error("Error fetching formation data:", error);
        });
    } catch (error) {
      console.error("Error fetching formation data:", error);
    }
  };
  useEffect(() => {
    getallformations();
  }, []);

  return (
    <>
      {!validationScreen ? (
        <div className="inscriptionParent">
          <h2 className="inscription-title">
            {/* { langue === "ar" ? formation.titre_ar : formation.titre_fr } */}
          </h2>
          <div
            className="inscription-content"
            id={clicked && !validationScreen ? "after-clicked" : ""}
          >
            <div className="inscription-form">
              <form onSubmit={handleSubmit}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <div class="coolinput">
                          <input
                            placeholder={Inscription.prenom}
                            type="text"
                            id="prenom"
                            className="input-inscription"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                          />
                          {Errors.prenom && (
                            <span className="errorMessage">
                              {Errors.prenom}
                              <i className="bx bxs-error"></i>
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div class="coolinput">
                          <input
                            placeholder={Inscription.nom}
                            type="text"
                            id="nom"
                            className="input-inscription"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                          />
                          {Errors.nom && (
                            <span className="errorMessage">
                              {Errors.nom}
                              <i className="bx bxs-error"></i>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="coolinput">
                          <input
                            placeholder={Inscription.telephone}
                            type="text"
                            id="telephone"
                            className="input-inscription"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                          />
                          {Errors.telephone && (
                            <span className="errorMessage">
                              {Errors.telephone}
                              <i className="bx bxs-error"></i>
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div class="coolinput">
                          <input
                            placeholder={Inscription.email}
                            type="text"
                            id="email"
                            className="input-inscription"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          {Errors.email && (
                            <span className="errorMessage">
                              {Errors.email}
                              <i className="bx bxs-error"></i>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="coolinput">
                          <input
                            placeholder={Inscription.birth}
                            type="date"
                            id="date_naissance"
                            className="input-inscription"
                            name="date_naissance"
                            value={formData.date_naissance}
                            onChange={handleChange}
                          />
                          {Errors.date_naissance && (
                            <span className="errorMessage">
                              {Errors.date_naissance}
                              <i className="bx bxs-error"></i>
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div class="coolinput">
                          <input
                            placeholder={Inscription.wtsp}
                            type="text"
                            id="numero_whatsapp"
                            className="input-inscription"
                            name="numero_whatsapp"
                            value={formData.numero_whatsapp}
                            onChange={handleChange}
                          />
                          {Errors.numero_whatsapp && (
                            <span className="errorMessage">
                              {Errors.numero_whatsapp}
                              <i className="bx bxs-error"></i>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="coolinput">
                          <input
                            placeholder={Inscription.niveau}
                            type="text"
                            id="niveau_etude"
                            className="input-inscription"
                            name="niveau_etude"
                            value={formData.niveau_etude}
                            onChange={handleChange}
                          />
                          {Errors.niveau_etude && (
                            <span className="errorMessage">
                              {Errors.niveau_etude}
                              <i className="bx bxs-error"></i>
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div class="coolinput">
                          <input
                            placeholder={Inscription.experience}
                            type="text"
                            id="experiences_formatives"
                            className="input-inscription"
                            name="experiences_formatives"
                            value={formData.experiences_formatives}
                            onChange={handleChange}
                          />
                          {Errors.experiences_formatives && (
                            <span className="errorMessage">
                              {Errors.experiences_formatives}
                              <i className="bx bxs-error"></i>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <div className="coolinput">
                        <select
                          id="ville"
                          className="input-inscription"
                          name="ville"
                          value={formData.ville}
                          onChange={handleChange}
                        >
                          <option value="" disabled selected>
                            {Inscription.select}
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
                        {Errors.ville && (
                          <span className="errorMessage">
                            {Errors.ville}
                            <i className="bx bxs-error"></i>
                          </span>
                        )}
                      </div>
                    </tr>
                  </tbody>
                </table>

                <button className="reserveBtn" type="submit">
                  {Inscription.submit}
                </button>
              </form>
            </div>
            <div
              className="inscription-affiche"
              id={clicked && !validationScreen ? "after-clicked" : ""}
            >
              <img
                className="affiche"
                src={`http://localhost:8000/storage/formations/affiche/${formations.affiche}`}
                onError={(e) => {
                    e.target.src = "/assets/altImage/alt-img.jpg";
                  }}
              />
            </div>
          </div>
          {clicked && responsemessage ? <Alert msg={responsemessage} /> : ""}
        </div>
      ) : (
        <Validation formData={formData} />
      )}
    </>
  );
};
