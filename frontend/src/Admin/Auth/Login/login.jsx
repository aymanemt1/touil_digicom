import React, { Fragment, useContext, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../auth.css";
import { LangueContext } from "../../../Context/LangueContext";
import Cookies from 'js-cookie';
export default function Login() {
  document.title = "Touil Digicom - Login";

  const navigate = useNavigate();

  const [responseMessage,setresponsemessage]=useState('Email or password incorrect')
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setErrors({
      emailError: "",
      passwordError: "",
    });
  
    let isValid = true;
  
    if (!validateEmail(formData.email)) {
      setErrors((prevState) => ({
        ...prevState,
        emailError: "Format d'email invalide",
      }));
      isValid = false;
    }

  
    if (!validatePassword(formData.password)) {
      setErrors((prevState) => ({
        ...prevState,
        passwordError: "Le mot de passe doit contenir au moins 1 caractère",
      }));
    }
    try {
      const response = await axios.post(
        "https://touildigicom.ma/api/signin",
        formData
      );
      const token = response.data.token;
      const admin = response.data.admin;
      Cookies.set('token', token);
      Cookies.set('adminname', admin.fullname);
      navigate('/touil_team_dashboard/statistiques');
    } catch (error) {
      console.log(error.response.data)
     
    }
  };
  

  return (
    <Fragment>
      <div className="parentLogin">
        <form onSubmit={handleSubmit}>
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
                    placeholder="E-mail"
                    onChange={handleChange}
                    name="email"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  {errors.emailError && (
                    <span className="error">
                      <i className="bx bxs-error"></i> {errors.emailError}
                    </span>
                  )}
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
                  {errors.passwordError && (
                    <span className="error">
                      <i className="bx bxs-error"></i> {errors.passwordError}
                    </span>
                  )}
                </td>
              </tr>
              
              <tr>
                <td>
                  <input
                    type="submit"
                    value="Se connecter"
                    className="btnSeeMoreServices "
                    id="inputSubmitAdmin"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </Fragment>
  );
}
