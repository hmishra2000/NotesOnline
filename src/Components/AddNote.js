import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'

function AddNote(props) {
    const context = useContext(noteContext)
    const {addNote} = context;
    const {showAlert}= props;
    const [note, setNote] = useState({
        title : "",
        description : "",
        tag : ""
    })

    const onClick=(e)=>{
      e.preventDefault();
      addNote(note.title, note.description, note.tag);
      showAlert("Note has been Added", "success");
      setNote({ title : "",
      description : "",
      tag : ""})

    }
    const onChange= (e) =>{
       setNote({...note , [e.target.name] : e.target.value})
    }
    return (
        <div style={{
            fontFamily : "initial", fontSize : "18px"}}>
            <div className="container">
                <h2> ADD A NOTE</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value= {note.title} placeholder="Add Title" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description"  value= {note.description} rows="3" placeholder="Add Description" onChange={onChange}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" rows="3"  value= {note.tag} placeholder="Add Tag" onChange={onChange}></input>
                    </div>
                    <button disabled={note.title.length <5 || note.description.length <5 }type="submit" className="btn btn-primary" onClick={onClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
