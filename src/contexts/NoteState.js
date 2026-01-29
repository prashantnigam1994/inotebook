import { useState } from "react";
import NoteContext from "./NoteContext";
import API_BASE_URL from "../config";

const NoteState = ({ children, showAlert }) => {
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // Fetch all notes
    const getNotes = async (title, description, tag) => {
        // API CALL
        const response = await fetch(`${API_BASE_URL}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
        });

        const json = await response.json()
        setNotes(json)
    }

    // Add a Note
    const addNote = async (title, description, tag) => {
        // API CALL
        const response = await fetch(`${API_BASE_URL}/api/notes/createnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json()
        setNotes(prevNotes => prevNotes.concat(json.savedNote));
        showAlert("Note added successfully", "success");
    }

    // Edit a Note
    const editNote = async ({ id, title, description, tag }) => {
        // API CALL
        const response = await fetch(`${API_BASE_URL}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = await response.json()

        let newNotes = JSON.parse(JSON.stringify(notes))

        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];
            if (element._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
        showAlert("Note updated successfully", "success");
    }

    // Delete a Note
    const deleteNote = async (id) => {
        // API CALL
        const response = await fetch(`${API_BASE_URL}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },

        });

        const json = await response.json()

        const newNotes = notes.filter((note) => note._id !== id)
        setNotes(newNotes)
        showAlert("Note deleted successfully", "success");
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
            {children}
        </NoteContext.Provider>
    )
}

export default NoteState
