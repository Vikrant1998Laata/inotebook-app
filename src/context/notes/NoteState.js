import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) =>{
  const host = "http://localhost:5000";
   const notesInitial = [];

   const [notes, setNotes] = useState(notesInitial)
  
   // Get a note
const getNotes = async ()=>{
  // using API call
const response = await fetch(`${host}/api/notes/fetchallnotes`, {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
  headers: {
    'Content-Type': 'application/json',
    "auth-token": localStorage.getItem('token')
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },

});
const json = await response.json(); // parses JSON response into native JavaScript objects
console.log(json);
setNotes(json);
}


  
// Add Note
const addNote = async (title, description, tag)=>{
  // using API call
const response = await fetch(`${host}/api/notes/addnote`, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  headers: {
    'Content-Type': 'application/json',
    "auth-token": localStorage.getItem('token')
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },

  body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
});
const note = await  response.json(); // parses JSON response into native JavaScript objects

  setNotes(notes.concat(note))
}





// Delete Note
const deleteNote = async (id)=>{
  console.log("Deleting the note " + id)

   // using API call
const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
  method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
  headers: {
    'Content-Type': 'application/json',
    "auth-token": localStorage.getItem('token')
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },

  // body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
});
const json =  response.json();
console.log(json)

  const newNotes = notes.filter((note)=>{return note._id !== id});
  setNotes(newNotes)
}




// Edit Note
const editNote = async (id, title, description, tag)=>{
// using API call
const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
  method: 'PUT', // *GET, POST, PUT, DELETE, etc.
  headers: {
    'Content-Type': 'application/json',
    "auth-token": localStorage.getItem('token')
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },

  body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
});
const json =  response.json(); // parses JSON response into native JavaScript objects
console.log(json)

let newNotes = JSON.parse(JSON.stringify(notes))
  // Editing the note 
for (let index = 0; index < newNotes.length; index++) {
  const element = newNotes[index];
  if(element._id === id){
    newNotes[index].title = title;
    newNotes[index].description = description;
    newNotes[index].tag = tag;
    break;
  }
}
setNotes(newNotes)
}
  
  

    return (
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNotes}}>
        {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;