import { Fragment, useRef } from "react";
import "./Devis.css";
import { Link } from "react-router-dom";

export default function Devis() {


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
            departemen: departemenRef.current.value
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
      <div className="parentDevis">
        <div className="colTitleDevis">
          <h1>DEMANDER UN DEVIS</h1>
          <p>
            * Veuillez remplir le formulaire ci-dessous pour obtenir un devis ou
            programmer un rendez-vous avec nos équipes. *
          </p>
        </div>
        <div className="parentBgDevis">
          <div className="colDevis1">
            <form className="formDevis" onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <input type="text" placeholder="Nom"  className="inputesDevis" ref={nomRef}/>
                    </td>
                    <td>
                      <input type="text" placeholder="Prenom"  className="inputesDevis" ref={prenomRef}/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" placeholder="Email"  className="inputesDevis" ref={emailRef}/>
                    </td>
                    <td>
                      <input type="text" placeholder="Telephone"  className="inputesDevis" ref={telephoneRef}/>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <select className="inputesDevis selectDevis" ref={departemenRef}>
                        <option>
                          Quel service vous interesse le plus ?
                        </option>
                        <option value="MARKETING & COMMUNICATION">
                          - MARKETING & COMMUNICATION
                        </option>
                        <option value="FORMATION">- FORMATION * KAFAAT *</option>
                        <option value="AUDIOVISUEL"> - AUDIOVISUEL</option>
                        <option value="ÉVÉNEMENTIEL"> - ÉVÉNEMENTIEL</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <input type="submit" value="Envoyer"  className="inputesDevis btnSubmitDevis"/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          <div className="colDevis2">
            <img src="./assets/illustrationsRemoveBg/i17.png" className="imgDevis"/>
          </div>
        </div>
      </div>
          <div className="questionContact">
            <h1>PLUS D'INFORMATIONS ? CONTACTEZ-NOUS</h1>
            <Link to='/contact'>
            <button className="btnContact"><span>Contact</span> 
            <i id="iconContact" className='bx bxs-message-dots'></i></button>
            </Link>
          </div>
    </Fragment>
  );
}
