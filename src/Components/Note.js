import React, { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';


function Note(props) {
    const history= useHistory();
    const context = useContext(noteContext);
    const { notes, getNotes , editNote} = context;
    const {showAlert} = props;
    useEffect(() => {
        if(localStorage.getItem('token')){
        getNotes();
        }
        else{
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle : currentNote.title,
            edescription : currentNote.description,
            etag : currentNote.tag

        })

        
    }

    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setNote] = useState({
        id : "",
        etitle : "",
        edescription : "",
        etag : ""
    })

    const onClick=()=>{
        editNote(note.id, note.etitle , note.edescription , note.etag );
         refClose.current.click();
         props.showAlert("Note has been successfully updated", "success");
    }
    const onChange= (e) =>{
       setNote({...note , [e.target.name] : e.target.value})
    }
    return (
        <>
            <AddNote  showAlert={showAlert}/>
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal"> Launch  </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="container">
                                    <h2> Add a Note</h2>
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="etitle" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="etitle" name="etitle" value= {note.etitle} placeholder="Add Title" onChange={onChange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="edescription" className="form-label">Description</label>
                                            <input type="text" className="form-control" id="edescription" name="edescription" value= {note.edescription}  rows="3" placeholder="Add Description" onChange={onChange}></input>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="etag" className="form-label">Tag</label>
                                            <input type="text" className="form-control" id="etag" name="etag" value={note.etag} rows="3" placeholder="Add Tag" onChange={onChange}></input>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button"  ref= {refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length <5 || note.edescription.length <5 } type="button" className="btn btn-primary " onClick={onClick} >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3" style={{fontFamily : "initial"}}>
                <h2> YOUR NOTES </h2>
                
                <div className="container">
                {notes.length===0 &&  <p>"No notes to show"</p>}
                </div>
                {notes.map((note) => {
                    // console.log(note);
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert= {showAlert} note={note} />;
                }
                )}
            </div>
        </>
    )
}

export default Note
