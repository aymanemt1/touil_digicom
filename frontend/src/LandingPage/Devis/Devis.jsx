import { Fragment, useContext, useRef, useState } from "react";
import "./Devis.css";
import { LangueContext } from "../../Context/LangueContext";
import { DevisTranslate } from './DevisTranslate';
import axios from "axios"
import { Alert } from "../../Components/Alert/Alert";


export default function Devis() {


  const { langue } = useContext(LangueContext);

  const Devis = DevisTranslate.devis.find(item => item.id == langue);


  const [DevisData,setDevisData] = useState({
    nom_devis:'',
    prenom_devis:'',
    email_devis:'',
    adress_devis:'',
    telephone_devis:'',
    service_devis:'',
  })
  const [Errors,setErrors] = useState({})
  const [responsemessage,setresponsemessage] = useState("")

    
  const handleChange = (e) => {
      setDevisData({...DevisData,[e.target.name] : e.target.value})
      setErrors({ ...Errors, [e.target.name]: '' });

    }
    
    const validateForm = () => {
      const validationErrors = {};

      if (DevisData.nom_devis.trim() === '') {
        validationErrors.nom_devis = 'Le nom est requis';
    } else if (/\d/.test(DevisData.nom_devis)) {
        validationErrors.nom_devis = 'Le nom ne doit pas contenir de chiffres';
    }
    if (DevisData.prenom_devis.trim() === '') {
        validationErrors.prenom_devis = 'Le prénom est requis';
    } else if (/\d/.test(DevisData.prenom_devis)) {
        validationErrors.prenom_devis = 'Le prénom ne doit pas contenir de chiffres';
    }
    if (DevisData.email_devis.trim() === '') {
        validationErrors.email_devis = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(DevisData.email_devis)) {
        validationErrors.email_devis = `L'email n'est pas valide`;
    }
    
    if (DevisData.adress_devis.trim() === '') {
        validationErrors.adress_devis = `L'adresse est requise`;
    } else if (/\d/.test(DevisData.adress_devis)) {
        validationErrors.adress_devis = `L'adresse ne doit pas contenir de chiffres`;
    }
    if (DevisData.service_devis.trim() === '') {
        validationErrors.service_devis = 'Le service est requis';
    }
    if (DevisData.telephone_devis.trim() === '') {
        validationErrors.telephone_devis = 'Le téléphone est requis';
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
  setresponsemessage(' envoyé avec succès')
}

  try {
      const response = await axios.post('https://touildigicom.ma/api/send-devis', DevisData);
      console.log(response.data.message);
      setDevisData({
          prenom_devis: '',
          nom_devis: '',
          email_devis: '',
          telephone_devis: '',
          adress_devis: '',
          service_devis: ''
      });
  } catch (error) {
      console.error('Error sending email:', error);
  }
};

  return (
    <Fragment>
      <div className={langue == 'fr' ? "parentDevis" : "parentDevis parentDevisAr"}>
        <div className="parentTextDevis">
          <div className="colLeftDevis">
            <br /><br />
            <h1 className={langue == 'fr' ? 'h1LandingPage h1LandingPageDevis' : 'h1LandingPage h1LandingPageDevis h1LandingPageAr'}>{Devis.title}</h1>
          </div>
          <div className={langue == 'fr' ? "colRightDevis" : "colRightDevis colRightDevisAr"}>
            <p>{Devis.paragraphe}</p>
          </div>
        </div>
        <div className={langue == 'fr' ? "parentFormDevis" : "parentFormDevis parentFormDevisAr"}>
          <div className={ langue == 'fr' ? "colFormDevis" : "colFormDevis colFormDevisAr" }>
            <h2>{Devis.titleForm}</h2>
            <form onSubmit={handleSubmit} className="formDevis">
            <table cellSpacing='3'>
              <tbody>
                <tr>
                  <td className="devisInp">
                    <input type="text" placeholder={Devis.nom} className="inputDevis" 
                    value={DevisData.nom_devis} 
                    name="nom_devis"
                    onChange={handleChange}
                    />
                {Errors.nom_devis && <span className='errorMessage'>{Errors.nom_devis}<i className='bx bxs-error'></i></span>} 
                  </td>
                  <td className="devisInp">
                    <input type="text" placeholder={Devis.prenom} className="inputDevis" 
                     value={DevisData.prenom_devis} 
                     name="prenom_devis"
                     onChange={handleChange}
                     />
                {Errors.prenom_devis && <span className='errorMessage'>{Errors.prenom_devis}<i className='bx bxs-error'></i></span>} 

                  </td>
                </tr>
                <tr>
                  <td className="devisInp">
                    <input type="text" placeholder={Devis.telephone} className="inputDevis" 
                     value={DevisData.telephone_devis} 
                     name="telephone_devis"
                     onChange={handleChange}/>
                {Errors.telephone_devis && <span className='errorMessage'>{Errors.telephone_devis}<i className='bx bxs-error'></i></span>} 

                  </td>
                  <td className="devisInp">
                    <input type="text" placeholder={Devis.email} className="inputDevis" 
                     value={DevisData.email_devis} 
                     name="email_devis"
                     onChange={handleChange}/>
                {Errors.email_devis && <span className='errorMessage'>{Errors.email_devis}<i className='bx bxs-error'></i></span>} 

                  </td>
                </tr>
                <tr>
                  <td className="devisInp">
                    <select   
                     name="service_devis"
                     onChange={handleChange}>
                      <option value="" selected disabled>{Devis.selectTitle}</option>
                      <option value="MARKETING & COMMUNICATION" >{Devis.option1}</option>
                      <option value="FORMATION * KAFAAT *" >{Devis.option2}</option>
                      <option value="AUDIOVISUEL" >{Devis.option3}</option>
                      <option value="ÉVÉNEMENTIEL" >{Devis.option4}</option>
                    </select>
                    <br />
                {Errors.service_devis && <span className='errorMessage'>{Errors.service_devis}<i className='bx bxs-error'></i></span>} 

                  </td>
                  <td className="devisInp">
                    <input type="text" placeholder={Devis.adress} className="inputDevis" 
                      value={DevisData.adress_devis} 
                      name="adress_devis"
                      onChange={handleChange}/>
                {Errors.adress_devis && <span className='errorMessage'>{Errors.adress_devis}<i className='bx bxs-error'></i></span>} 

                  </td>
                </tr>
                <tr>
                  <td colSpan='2' >
                    <input type="submit" value={Devis.submit} className="submitDevis"/>
                  </td>
                </tr>
              </tbody>
            </table>
            </form>
          </div>
          <div className="colFormPicDevis">
            <div className="colHeaderDevis">
              <div className="brandLogoDevis">
                <img  src="/assets/Logo/logo3.png" />
                <h5 className="serviceDevis">{DevisData.service_devis}</h5>
              </div>
              <div className="textHeaderDevis">
                <h3>DEVIS</h3>
                <p>N° 0012345</p>
                <p>Date : 30/01/24</p>
              </div>
            </div>
            <div className="colInfoClient">
              <h4>Client</h4>
              <p>Nom de client : {DevisData.nom_devis} {DevisData.prenom_devis}</p>
              <p>Teleohone : {DevisData.telephone_devis}</p>
              <p>Email : {DevisData.email_devis}</p>
              <p>Adress : {DevisData.adress_devis}</p>
            </div>
            <div className="colTabledevis">
              <table className="tableDevis" cellspacing="0">
                <thead>
                  <tr>
                    <th className="DecriptionDevisCol">Description</th>
                    <th>Tarif/ jour</th>
                    <th>Nb jours</th>
                    <th>Montant</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><div className="spaceDevisTd"></div></td>
                    <td><div className="spaceDevisTd"></div></td>
                    <td><div className="spaceDevisTd"></div></td>
                    <td><div className="spaceDevisTd"></div></td>
                  </tr>
                  <tr>
                    <td><div className="spaceDevisTd"></div></td>
                    <td><div className="spaceDevisTd"></div></td>
                    <td><div className="spaceDevisTd"></div></td>
                    <td><div className="spaceDevisTd"></div></td>
                  </tr>
                  <tr>
                    <td><div className="spaceDevisTd"></div></td>
                    <td><div className="spaceDevisTd"></div></td>
                    <td><div className="spaceDevisTd"></div></td>
                    <td><div className="spaceDevisTd"></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="colTypeDevis">
              <div className="colLeftTypeDevis">
                <p>Mode de paiement :</p>
                <p>Date d'échéance :</p>
              </div>
              <div className="colRightTypeDevis">
                <h5>Sous total</h5>
                <h5>Taux TVA</h5>
                <h5>Total</h5>
              </div>
            </div>
            <div className="colSignataire">
              <p>Merci pour votre confiance !</p>
            </div>
            <div className="colInformationDevisTouil">
              <ul>
                <li><i className='bx bxs-phone'></i> +212 628 79 45 01 </li>
                <li><i className='bx bx-envelope' ></i> contact@touildiicom.ma </li>
                <li><i className='bx bx-world'></i> touildigicom.ma</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      { responsemessage && <Alert msg={responsemessage} />}

    </Fragment>
  );
}
