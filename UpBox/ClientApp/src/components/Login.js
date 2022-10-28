import React, { useState } from "react";
import axios from "axios";
import jwt from "jwt-decode";
import PropTypes from "prop-types";

export default function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const login = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/account/login`, {
        username,
        password,
      })
      .then((response) => {
        setToken(response.data.token);
        const payload = jwt(localStorage.getItem("token"));
        console.log(payload);
      });
  };

  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={login}>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
