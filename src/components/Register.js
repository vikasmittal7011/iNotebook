import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    mail: "",
    password: "",
  });

  const navigate = useNavigate();

  const { name, mail, password } = user;

  const registerController = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, mail, password }),
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem("token", data.authToken);
      navigate("/login");
    } else {
      alert("Something is wrong!!");
    }
  };

  const handleChnage = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="my-4">
    <h1>Register your self to access or add notes in iNotebook</h1>
      <form onSubmit={registerController}>
        <div className="mb-3">
          <label htmlFor="mail" className="form-label">
            Name
          </label>
          <input
            name="name"
            value={user.name}
            type="text"
            className="form-control"
            id="name"
            onChange={handleChnage}
          />
        </div>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
