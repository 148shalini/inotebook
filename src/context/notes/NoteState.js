//hmesa likni h when we use contex state
// import React from "react";
import { useState } from "react";
import NoteContext from "./notecontext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitials = []
  const [notes, setnotes] = useState(notesInitials)
// get all notes

const getNotes = async() => {
  //todo:api call
  //api call

  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJpZCI6IjY0ZjRiMzMyNDljOGQ4NDkwZWM2NjExMSJ9LCJpYXQiOjE2OTQwMDQ2OTd9.PsvaWZrLtU_vY4iG6QJ3YZbcGTObCCa0wXAhlx7FW50"

    },

    // body: JSON.stringify(),
  });
 
  const json=await response.json()

  setnotes(json)

}


  // add notes

  const addNotes = async(title, description, tag) => {
    //todo:api call
    //api call

    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJpZCI6IjY0ZjRiMzMyNDljOGQ4NDkwZWM2NjExMSJ9LCJpYXQiOjE2OTQwMDQ2OTd9.PsvaWZrLtU_vY4iG6QJ3YZbcGTObCCa0wXAhlx7FW50"

      },

      body: JSON.stringify({title,description,tag}),
    });
   const note=await response.json()
   setnotes(notes.concat(note))
  
  }
  //delete a note
  const deleteNotes = async(id) => {
    //todo:api call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJpZCI6IjY0ZjRiMzMyNDljOGQ4NDkwZWM2NjExMSJ9LCJpYXQiOjE2OTQwMDQ2OTd9.PsvaWZrLtU_vY4iG6QJ3YZbcGTObCCa0wXAhlx7FW50"

      },

      body: JSON.stringify(),
    });
    const json = response.json();
    
    const newNotes = notes.filter((notes) => { return notes._id !== id })
    setnotes(newNotes)
  }
  //edit a note
  const editNotes = async (id, title, description, tag) => {
    //api call

    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VycyI6eyJpZCI6IjY0ZjRiMzMyNDljOGQ4NDkwZWM2NjExMSJ9LCJpYXQiOjE2OTQwMDQ2OTd9.PsvaWZrLtU_vY4iG6QJ3YZbcGTObCCa0wXAhlx7FW50"

      },

      body: JSON.stringify({title,description,tag}),
    });
    const json = await response.json();
   
    //extra
    let newNotes=JSON.parse(JSON.stringify(notes))

    //logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;

        break;
      }



    }
    console.log(id,notes)
    setnotes(newNotes);

  }

  return (
    <NoteContext.Provider value={{ notes, addNotes, deleteNotes, editNotes,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )


}
export default NoteState;