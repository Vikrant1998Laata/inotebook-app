import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

const Notes = (props) => {
let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, addNote, getNotes, editNote } = context;
  const ref = useRef(null);
  const refclose = useRef(null);
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }else{
       navigate("/login")
    }

  }, [])
  
  const [note, setNote] = useState({
    id:"",
    etitle: "",
    edescription: "",
    etag: "",
  });

  
  const updateNote = (currentNote)=>{
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    
  }

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle ,note.edescription, note.etag)
    refclose.current.click();
    // addNote(note.etitle, note.edescription, note.etag);
    console.log("updating note", note)
    props.showAlert("Note updated succesfully", "success")
  };

  const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }

  return (
    <>
  
    <AddNote showAlert={props.showAlert}/>
{/* // Updating note using modal */}
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Add Title
          </label>
          <input
            type="text"
            className="form-control "
            id="etitle"
            name="etitle"
            value={note.etitle}
            aria-describedby="emailHelp"
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Add description
          </label>
          <input
            type="text"
            className="form-control"
            id="edescription"
            value={note.edescription}
            name="edescription"
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Add Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="etag"
            value={note.etag}
            name="etag"
            onChange={onChange}
            minLength={5} required
          />
        </div>
       
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>


      <div className="row my-3">
          <h1> Your notes </h1>
        <div className="container mx-2">{notes.length === 0 && 'No Notes to display'}</div>
      {notes.map((note) => {
        return <Noteitem key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote}/>
      })}
    </div>
   
    </>
  );
};

export default Notes;
