import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const baseURL = "https://sticky-note-fe.vercel.app/";
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const getUserData = (e) => {
    // console.log(e.target.name);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    let { data } = await axios.post(baseURL + "signin", user);
    console.log(data);
    setLoading(false);
    if (data.message === "success") {
      // Navigate to home
      navigate("/home");
      localStorage.setItem("userToken", data.token);
    } else {
      setError(data.message);
    }
  };
  return (
    <>
      <div className="container my-5 py-5">
        <div className="col-md-5 m-auto text-center">
          <form onSubmit={addUser}>
            <div className="form-group">
              <input
                placeholder="Enter email"
                type="email"
                name="email"
                className="form-control"
                onChange={getUserData}
              />
            </div>
            <div className="form-group my-2">
              <input
                placeholder="Enter you password"
                type="password"
                name="password"
                className=" form-control"
                onChange={getUserData}
              />
            </div>

            {loading ? (
              <button type="submit" className="btn btn-info w-100">
                loading...
              </button>
            ) : (
              <button type="submit" className="btn btn-info w-100">
                SignIn
              </button>
            )}

            {error ? (
              <div className="alert alert-danger mt-2">{error}</div>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
