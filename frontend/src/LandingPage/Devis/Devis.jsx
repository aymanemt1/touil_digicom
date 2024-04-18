import { Fragment, useContext, useRef, useState } from "react";
import "./Devis.css";
import { LangueContext } from "../../Context/LangueContext";
import { DevisTranslate } from './DevisTranslate';

export default function Devis() {


  const { langue } = useContext(LangueContext);

  const Devis = DevisTranslate.devis.find(item => item.id == langue);

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [adress, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [service, setService] = useState('');


  const nomRef = useRef();
  const prenomRef = useRef();
  const emailRef = useRef();
  const telephoneRef = useRef();
  const departemenRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      nom: nomRef.current.value,
      prenom: prenomRef.current.value,
      email: emailRef.current.value,
      telephone: telephoneRef.current.value,
      departemen: departemenRef.current.value,
    };

    // axios.post('API', formData)
    //     .then(response => {
    //         console.log('API:', response.data);

    //         nomRef.current.value = '';
    //         prenomRef.current.value = '';
    //         emailRef.current.value = '';
    //         telephoneRef.current.value = '';
    //         departemenRef.current.value = '';

    //         alert('Votre formulaire a été soumis avec succès!');
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
  }

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
            <form className="formDevis">
            <table cellSpacing='3'>
              <tbody>
                <tr>
                  <td>
                    <input type="text" placeholder={Devis.nom} className="inputDevis" onChange={e => setNom(e.target.value)}/>
                  </td>
                  <td>
                    <input type="text" placeholder={Devis.prenom} className="inputDevis" onChange={e => setPrenom(e.target.value)}/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" placeholder={Devis.telephone} className="inputDevis" onChange={e => setTelephone(e.target.value)}/>
                  </td>
                  <td>
                    <input type="text" placeholder={Devis.email} className="inputDevis" onChange={e => setEmail(e.target.value)}/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <select onChange={e => setService(e.target.value)}>
                      <option value="" >{Devis.selectTitle}</option>
                      <option value="MARKETING & COMMUNICATION" >{Devis.option1}</option>
                      <option value="FORMATION * KAFAAT *" >{Devis.option2}</option>
                      <option value="AUDIOVISUEL" >{Devis.option3}</option>
                      <option value="ÉVÉNEMENTIEL" >{Devis.option4}</option>
                    </select>
                  </td>
                  <td>
                    <input type="text" placeholder={Devis.adress} className="inputDevis" onChange={e => setAddress(e.target.value)}/>
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
                <img src="./assets/Logo/logo3.png"  />
                <h5 className="serviceDevis">{service}</h5>
              </div>
              <div className="textHeaderDevis">
                <h3>DEVIS</h3>
                <p>N° 0012345</p>
                <p>Date : 30/01/24</p>
              </div>
            </div>
            <div className="colInfoClient">
              <h4>Client</h4>
              <p>Nom de client : {nom} {prenom}</p>
              <p>Teleohone : {telephone}</p>
              <p>Email : {email}</p>
              <p>Adress : {adress}</p>
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
    </Fragment>
  );
}
