import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Modal = ({ getAllNotes }) => {
  // token , userid
  const baseURL = "https://sticky-note-fe.vercel.app/";
  const token = localStorage.getItem("userToken");
  const decoded = jwt_decode(token);
  const userID = decoded._id;
  const [note, setNote] = useState({ title: "", desc: "" });

  const getuserNote = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  //   console.log(note);

  const addNote = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(baseURL + "addNote", {
      title: note.title,
      desc: note.desc,
      token,
      citizenID: userID,
    });
    console.log(data);
    if (data.message === "success") {
      document.getElementById("add-form").reset();
      getAllNotes();
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-light shadow-lg d-block ms-auto my-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <AiFillPlusCircle className="me-1 fs-4" />
        New Note
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form id="add-form" onSubmit={addNote}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  placeholder="Type Title"
                  name="title"
                  className="form-control"
                  onChange={getuserNote}
                />
                <textarea
                  className="form-control my-2"
                  placeholder="Type your note"
                  name="desc"
                  id=""
                  cols="30"
                  rows="10"
                  onChange={getuserNote}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light "
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button className="btn btn-primary" type="submit">
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
