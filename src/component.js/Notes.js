// import React from 'react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/notecontext';
import Noteitem from './Noteitem';
import Addnotes from './Addnotes';
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNotes } = context;
  useEffect(() => {
    getNotes()
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setnotes] = useState({ id:"",etitle: "", edescription: "", etag: "default" })
  
  const updateNotes = (currentNotes) => {
    ref.current.click();
    setnotes({id: currentNotes._id,etitle:currentNotes.title, edescription:currentNotes.description, etag:currentNotes.tag})
    
  }
  
  const handleClick = (e) => {
    // console.log("updating the notes...",note)
    editNotes(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
  }
  const onChange = (e) => {
    setnotes({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Addnotes />



      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit notes</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label"> Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>

                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription " name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag " name='etag' value={note.etag} onChange={onChange} />
                </div>


              </form>

            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5}  onClick={handleClick} type="button" className="btn btn-primary"> Update Notes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">

        <h2>you notes</h2>
        <div className="container mx-2">
        {notes.length===0 && 'No notes to display '}
        </div>
        {notes.map((notes) => {
          return <Noteitem key={notes._id} updateNotes={updateNotes} notes={notes} />
        })}
      </div>
    </>
  )
}

export default Notes
