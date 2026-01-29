import React, { useContext } from 'react'
import NoteContext from '../contexts/NoteContext';

export default function NoteItem({ note, updateNote }) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const deleteNoteId = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this note?");
        if (confirmDelete) {
            deleteNote(id)
        }
    }
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text"><strong>Description: </strong>{note.description}</p>
                    <p className="card-text"><strong>Tags: </strong>{note.tag}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={() => deleteNoteId(note._id)}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={() => updateNote(note)}></i>
                </div>
            </div>
        </div>
    )
}
