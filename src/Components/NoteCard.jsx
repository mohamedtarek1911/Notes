import React, { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import jwt_decode from "jwt-decode";

const NoteCard = (props) => {
  const { note, getAllNotes, index, notes } = props;
  const token = localStorage.getItem("userToken");
  // const token = localStorage.getItem("userToken");
  const decoded = jwt_decode(token);
  const userID = decoded._id;
  console.log(notes);
  const [Note, setNote] = useState({
    title: "",
    desc: "",
    noteid: userID,
    token,
  });
  // deleteNote
  const baseURL = "https://sticky-note-fe.vercel.app/";
  let index2 = 1;

  const deleteNote = async (NoteID) => {
    const { data } = await axios.delete(baseURL + "deleteNote", {
      data: {
        NoteID,
        token,
      },
    });

    if (data.message === "deleted") {
      getAllNotes();
    }
  };

  function getNoteId(index, e) {
    // console.log(notes[index]);
    index2 = index;
    console.log(index, index2);
    document.querySelector("#title").value = notes[index].title;
    document.querySelector("#desc").value = notes[index].desc;
    // notes[index].title = document.querySelector("#title").value;
    // notes[index].desc = document.querySelector("#desc").value;
    // setNote({
    //   ...Note,
    //   title: notes[index].title,
    //   desc: notes[index].desc,
    //   NoteID: notes[index]._id,
    //   token,
    // });
    // setNote({
    //   ...Note,
    //   [e.target.name]: e.target.value,
    //   token,
    //   NoteID: notes[index2]._id,
    // });
    // index2 = index;
  }

  function addNote(e) {
    console.log(index2, index);

    setNote({
      ...Note,
      title: notes[index2].title,
      desc: notes[index2].desc,
      token,
      NoteID: notes[index]._id,
      // [e.target.name]: e.target.value,
    });
  }

  async function updateNote(e) {
    e.preventDefault();
    console.log(Note);
    let { data } = await axios.put(baseURL + "updateNote", Note);

    console.log(data);
    if (data.message === "updated") {
      getAllNotes();
    }
  }

  // console.log(note[index]);
  return (
    <>
      {" "}
      <div className="note p-4">
        <h3 className="float-start">{note.title}</h3>
        <span
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
          className="float-end edit"
          onClick={(e) => {
            getNoteId(index, e);
          }}
        >
          <AiOutlineEdit />
        </span>
        <span
          onClick={() => deleteNote(note._id)}
          className="float-end px-3 del text-danger  "
        >
          <RiDeleteBinLine />
        </span>
        <span className="clearfix"></span>
        <p>{note.desc}</p>
      </div>
      {/* <!-- Edit Modal --> */}
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form
          onSubmit={(e) => {
            updateNote(e);
          }}
          id="edit-form"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  placeholder="Type Title"
                  name="title"
                  className="form-control"
                  type="text"
                  id="title"
                  onChange={addNote}
                />
                <textarea
                  className="form-control my-2"
                  placeholder="Type your note"
                  name="desc"
                  id="desc"
                  cols="30"
                  rows="10"
                  onChange={addNote}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  data-bs-dismiss="modal"
                  type="submit"
                  className="btn btn-info"
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NoteCard;
