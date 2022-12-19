import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import NoteCard from "./NoteCard";
import Modal from "./Modal";

const Home = () => {
  // get all notes
  const baseURL = "https://sticky-note-fe.vercel.app/";
  const token = localStorage.getItem("userToken");
  const decoded = jwt_decode(token);
  const userID = decoded._id;
  const [notes, setNotes] = useState([]);

  const getAllNotes = async () => {
    const { data } = await axios.post(baseURL + "getUserNotes", {
      token,
      userID,
    });
    setNotes(data.Notes);
    console.log(data.Notes);
  };
  console.log(notes);

  //   console.log(notes);
  useEffect(() => {
    getAllNotes();
  }, []);
  return (
    <div className="container">
      <Modal getAllNotes={getAllNotes} />
      <div className="row">
        {notes &&
          notes.map((note, index) => (
            <div key={note._id} className="col-md-4 my-4">
              <NoteCard
                notes={notes}
                index={index}
                note={note}
                getAllNotes={getAllNotes}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
