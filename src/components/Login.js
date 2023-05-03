import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    mail: "",
    password: "",
  });

  const navigate = useNavigate();

  const { mail, password } = user;

  const handleChnage = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginController = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/loginUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mail, password }),
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      localStorage.setItem("token", data.authToken);
      navigate("/");
    } else {
      alert("Dont have login permission");
    }
  };
  return (
    <div className="my-4">
    <h1>Login to access your notes</h1>
      <form onSubmit={loginController}>
        <div className="mb-3">
          <label htmlFor="mail" className="form-label">
            Email address
          </label>
          <input
            name="mail"
            value={user.mail}
            type="email"
            className="form-control"
            id="mail"
            onChange={handleChnage}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            name="password"
            value={user.password}
            type="password"
            className="form-control"
            id="password"
            onChange={handleChnage}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
