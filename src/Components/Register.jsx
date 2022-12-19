import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import joi from "joi";

const Register = () => {
  const navigate = useNavigate();
  const baseURL = "https://sticky-note-fe.vercel.app/";
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ErrorList, setErrorList] = useState([]);

  const getUserData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    let validationResponse = validationFormData();
    if (validationResponse.error) {
      setErrorList(validationResponse.error.details);
      console.log(ErrorList);
      // setLoading(true);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    let validationResponse = validationFormData();
    // console.log(validationResponse);
    // console.log(validationResponse.error.details);
    if (validationResponse.error) {
      setErrorList(validationResponse.error.details);
      console.log(ErrorList);
      setLoading(true);
    } else {
      let { data } = await axios.post(baseURL + "signup", user);
      setLoading(false);
      if (data.message === "success") {
        // Navigate to login
        navigate("/login");
      } else {
        setError(data.message);
      }
    }
  };

  let validationFormData = () => {
    const schema = joi.object({
      first_name: joi.string().alphanum().required().min(2).max(20),
      last_name: joi.string().alphanum().required().min(2).max(20),
      age: joi.number().required().min(18).max(80),

      email: joi
        .string()
        .required()
        .email({ tlds: { allow: ["com", "net"] } }),
      password: joi
        .string()
        .required()
        .pattern(new RegExp(/^[a-zA-Z0-9]{3,30}$/)),
    });

    return schema.validate(user, { abortEarly: false });
  };

  return (
    <>
      <div className="container my-5 py-5">
        <div className="col-md-5 m-auto text-center">
          <form onSubmit={addUser}>
            {ErrorList.map((error, index) => {
              return (
                <div key={index} className="alert alert-danger mt-2">
                  {error.message}
                </div>
              );
            })}

            {error ? (
              <div className="alert alert-danger mt-2">{error}</div>
            ) : (
              ""
            )}
            <div className="form-group">
              <input
                placeholder="Enter your first name"
                name="first_name"
                type="text"
                className=" form-control"
                onChange={getUserData}
              />
            </div>
            <div className="form-group my-2 ">
              <input
                placeholder="Enter your last name"
                name="last_name"
                type="text"
                className="form-control"
                onChange={getUserData}
              />
            </div>
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
            <div className="form-group my-2">
              <input
                placeholder="Enter you Age"
                type="number"
                name="age"
                className=" form-control"
                onChange={getUserData}
              />
            </div>
            {loading ? (
              <button type="submit" className="btn btn-info w-100">
                lodaing ...
              </button>
            ) : (
              <button type="submit" className="btn btn-info w-100">
                SignUp
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
