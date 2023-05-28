/** 
* author: jevin sutariya
*/

import React, { useState } from "react";
import axios from "axios";
import './Login.css';
import { setAuthToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useUserContext, } from "../../context/userContext";
import Notify from "../../utils/toast";

const Login = () => {
  const { loginUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function validateForm() {
    return email.length > 3 && password.length > 7;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginPayload = {
      email,
      password
    }

    axios.post(`https://food-order-backend.jevin08.repl.co/api/v1/login`,
      loginPayload,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        console.log(response);
        // get token and user from response
        const user = response.data.user;
        const token = response.data.token;

        // set token and user to local storage
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        loginUser();
        Notify({ message: 'You logged in successfully', type: 'success' });
        //set token to axios common header
        setAuthToken(token);

        //redirect user to home page
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 401) {
          console.log('login failed');
        }
      });
  };



  return (
    <div className="d-flex justify-content-between app-background">
      <form onSubmit={handleSubmit} className="loginForm shadow rounded col-lg-4 col-md-6 col-sm-8 col-xs-12" >
        <h2 className="text-center mb-2">Login form</h2>
        <div className="form-group mb-2">
          <label labelfor="email ">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
          <small id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group mb-2">
          <label labelfor="password">Password</label>
          <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <small id="passwordHelp" className="form-text text-light">Password length must greater or equal to 8.</small>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn mb-3 " disabled={!validateForm()}>{isLoading ? <div className="spinner-border" role="status"></div> : 'Sign in'}</button>
        </div>
      </form>
    </div>
  );
}

export default Login;