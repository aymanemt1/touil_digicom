import React, { Fragment, useContext, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./login.css";
import { LangueContext } from "../../Context/LangueContext";

export default function Login() {
  document.title = "Touil Digicom - Login";

  const {setisauth ,isauth} = useContext(LangueContext);


  const navigate = useNavigate();

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
      isValid = false;
    }
  
    if (isValid) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/login",
          formData
        );
  
        const { valid } = response.data;
  
        if (valid) {
          const { admin, token, valid } = response.data;

  
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('valid', valid);
          sessionStorage.setItem('admin', JSON.stringify(admin));
  
          setisauth(valid ? true : false);
  
          navigate('/dashboard/statistiques');
        } else {
          alert('Email or password incorrect');
        }
      } catch (error) {
        alert('Email ou mot de passe incorrect');
        console.error("Error sending email:", error);
      }
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
                    type="text"
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
                  <button>Mot de passe oublié ?</button>
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
