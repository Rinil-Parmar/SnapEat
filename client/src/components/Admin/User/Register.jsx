/** 
* last updated at: 09:01PM 02/03/2023
* author: jevin sutariya
*/

import React, { useState } from "react";
import axios from "axios";
import './Register.css';
import { setAuthToken } from "../../../utils/auth";

const Register = () => {
  const [user, setUser] = useState({
    firstname: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return user.firstname.length > 2 && user.surname.length > 2 && user.email.length > 4 && user.password.length > 7 && user.confirmPassword === user.password;
  }

  const updateUser = (par) => {
    setUser({ ...user, ...par });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`https://food-order-backend.jevin08.repl.co/api/v1/register`,
      user,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        const user = response.data.user;
        console.log(`${user.firstname} ${user.surname} is registred successfully.`);
        //redirect user to home page
        window.location.href = '/admin/user/register';
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 401) {
          console.log('login failed');
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="registerForm border border-primary rounded">
        <div className="form-group">
          <label labelfor="firstname">First name</label>
          <input type="text" className="form-control" id="firstname" aria-describedby="firstnameHelp" placeholder="Enter first name" autoFocus value={user.firstname} onChange={(e) => updateUser({ firstname: e.target.value })} />
          <small id="firstnameHelp" className="form-text text-muted">Atleast 3 character.</small>
        </div>
        <div className="form-group">
          <label labelfor="surname">Surname</label>
          <input type="text" className="form-control" id="surname" aria-describedby="lastnameHelp" placeholder="Enter surname" autoFocus value={user.surname} onChange={(e) => updateUser({ surname: e.target.value })} />
          <small id="lastnameHelp" className="form-text text-muted">Atleast 3 character.</small>
        </div>
        <div className="form-group">
          <label labelfor="email">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" autoFocus value={user.email} onChange={(e) => updateUser({ email: e.target.value })} />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label labelfor="password">Password</label>
          <input type="password" className="form-control" id="password" aria-describedby="passwordHelp" placeholder="Password" value={user.password} onChange={(e) => updateUser({ password: e.target.value })} />
          <small id="passwordHelp" className="form-text text-muted">Password length must greater or equal to 8.</small>
        </div>
        <div className="form-group">
          <label labelfor="confirmPassword">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" aria-describedby="confirmPasswordHelp" placeholder="Password" value={user.confirmPassword} onChange={(e) => updateUser({ confirmPassword: e.target.value })} />
          <small id="confirmPasswordHelp" className="form-text text-muted">Password and confirm password must be same.</small>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-3" disabled={!validateForm()}>{isLoading ? <div className="spinner-border" role="status"></div> : 'Register Manager'}</button>
      </form>
    </>
  );
}

export default Register;