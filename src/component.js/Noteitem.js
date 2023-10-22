import React, {useContext} from 'react'
import noteContext from '../context/notes/notecontext';
const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNotes } = context;
  const { notes,updateNotes } = props;
  return (
    <div className='col-md-3'>
    
      <div className="card my-3" >
     
        <div className="card-body">
          <div className='d-flex align-items-center'>
          <h5 className="card-title">{notes.title}</h5>
          <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNotes(notes._id)}}></i>
          <i className="far fa-edit mx-2" onClick={()=>{updateNotes(notes)}}></i>
          </div>

          
          <p className="card-text">{notes.description}</p>
          
        </div>
      </div>
    </div>
  )
}

export default Noteitem
