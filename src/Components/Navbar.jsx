import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  let navigate = useNavigate();
  const token = localStorage.getItem("userToken");
  let logout = () => {
    localStorage.clear();
    // localStorage.removeItem("userToken");
    navigate("/login");
  };
  return (
    <>
      {" "}
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container">
          <h2 className="navbar-brand">
            <span>
              <i className="fa-solid fa-note-sticky"></i>
            </span>
            Notes
          </h2>
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!token ? (
                <>
                  <li className="nav-item">
                    <Link
                      to="register"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="login" className="nav-link">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link onClick={logout} to="login" className="nav-link">
                      LogOut
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
