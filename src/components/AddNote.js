import React, { useContext, useState } from "react";
import noteContaxt from "../contexts/notes/NoteContaxt";

function AddNote() {
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const addDetailsOfNote = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  const context = useContext(noteContaxt);

  const addNewNote = (e) => {
    e.preventDefault();
    context.addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };

  return (
    <>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={addDetailsOfNote}
              value={note.title}
              required={true}
              placeholder="Atleat 5 Char"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={addDetailsOfNote}
              value={note.description}
              required={true}
              placeholder="Atleat 5 Char"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={addDetailsOfNote}
              value={note.tag}
            />
          </div>

          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={addNewNote}
          >
            Add
          </button>
        </form>
      </div>
    </>
  );
}

export default AddNote;
