import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';
import "../auth.css";
import { LangueContext } from '../../../Context/LangueContext';


export const RegisterForm = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      fullname: "",
      email: "",
      password: "",
    });

    const [errors, setErrors] = useState({});
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
      };
    
       
    const validateForm = () => {
      const validationErrors = {};

      if (formData.fullname.trim() === '') {
        validationErrors.fullname = "Le username est requis";
    }
    if (formData.email.trim() === '') {
        validationErrors.email = 'Le email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        validationErrors.email = "L\'email doit être valide";
    }
    if (formData.password.trim() === '') {
        validationErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 7 ) {
        validationErrors.password = "au moins 7 caractères";
    }
     

      setErrors(validationErrors);

      return Object.keys(validationErrors).length === 0;
  };

    const handleSignup = async (e) => {
        e.preventDefault()
      
        if (!validateForm()) {
      
          return; 
      }
      const isFormValid = validateForm();

      if (isFormValid) {
        // setresponsemessage(' envoyé avec succès')
      }
           try {
             console.log(formData)
                const response = await axios.post('http://127.0.0.1:8000/api/signup',formData)
                const token = response.data.token;
                const admin = response.data.admin;
                Cookies.set('token', token);
                Cookies.set('adminname', admin.fullname);
                navigate('/touil_team_dashboard/statistiques');

            } catch (error) {
                console.log(error)
            }
    }

  return (
    <>
      <div className="parentLogin">

     <form onSubmit={handleSignup}>
          <table>
            <tbody>
              <tr>
                <td>
                  <img src="/assets/Logo/logo3.png" alt="" />
                </td>
              </tr>
              <tr>
                <td className="tdInput">
                  <i className="bx bx-envelope"></i>
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={handleChange}
                    name="fullname"
                  />
                </td>
              </tr>
              <tr>
                <td>
                {errors.fullname && <span className='errorMessage'>{errors.fullname} <i className='bx bxs-error'></i></span>} 

                </td>
              </tr>
              <tr>
                <td className="tdInput">
                  <i className="bx bx-envelope"></i>
                  <input
                    type="text"
                    placeholder="E-mail"
                    onChange={handleChange}
                    name="email"
                  />
                </td>
              </tr>
              <tr>
                <td>
                {errors.email && <span className='errorMessage'>{errors.email} <i className='bx bxs-error'></i></span>} 

                </td>
              </tr>
              <tr>
                <td className="tdInput">
                  <i className="bx bx-lock-alt"></i>
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    onChange={handleChange}
                    name="password"
                  />
                </td>
              </tr>
              <tr>
                <td>
                {errors.password && <span className='errorMessage'>{errors.password} <i className='bx bxs-error'></i></span>} 

                </td>
              </tr>
              
              <tr>
                <td>
               <button className="btnSeeMoreServices " id="inputSubmitAdmin" type="submit">Sign Up</button>

                </td>
              </tr>
            </tbody>
          </table>
        </form>
        </div>
    </>
  )
}
