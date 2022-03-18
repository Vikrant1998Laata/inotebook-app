import React, { useContext} from "react";
import noteContext from "../context/notes/noteContext";
import {PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
const Noteitem = ( props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
    const {note, updateNote} = props;
  return (
      <div className='col-md-3 my-3'>
    <div className="card" style={{width: "18rem"}} >
    <div className="card-body">
        <div className='d-flex align-items-center'>
      <h5 className="card-title">{note.title}</h5>
      <div className='d-flex mx-2' style={{width: "40px", height:"40px", cursor: "pointer"}}>
    <TrashIcon onClick={()=>{deleteNote(note._id);props.showAlert("Note deleted succesfully", "success")}}/>
    <PencilAltIcon onClick={()=>{updateNote(note)}} />
      </div>

        </div>

      
      <p className="card-text">{note.description}</p>
    </div>
  </div>
      </div>

  )
}

export default Noteitem