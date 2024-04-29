import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookie from 'cookie-universal'

export const RegisterForm = () => {

    const navigate = useNavigate()
    const [signupData,setSignupData] = useState({})

    
    const handleSignupData = (e) => {
        setSignupData({...signupData,[e.target.name] : e.target.value})
    }


    const handleSignup = async (e) => {
        e.preventDefault()
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/signup',signupData)
                const token = response.data.token

               Cookie.set('token',token)
               navigate('/dashboard/statistiques');
            } catch (error) {
                console.log(error)
            }
    }

  return (
    <>
    <div class="container" id="container">
        <div class="">
            <h1>Create Account</h1>
            <form onSubmit={handleSignup}>
                <input onChange={handleSignupData} type="text" name="fullname" placeholder="fullname"  required/>
<br />
                <input onChange={handleSignupData} type="email" name="email" placeholder="Email" required/>
<br />
                <input onChange={handleSignupData} type="password" name="password" placeholder="Password" required/>
<br />
<br />
                <button  type="submit">Sign Up</button>
            </form>
        </div>
    </div>
    </>
  )
}
