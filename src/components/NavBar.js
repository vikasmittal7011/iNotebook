import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {
  let location = useLocation();
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNoteBook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" && "active"
                  } `}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" && "active"
                  } `}
                  to="/about"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          {!localStorage.getItem("token") ? (
            <div className="d-flex">
              <Link className="btn btn-primary mx-4" to="/register">
                Regeister
              </Link>
              <Link className="btn btn-primary" to="/login">
                Login
              </Link>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={logoutUser}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
