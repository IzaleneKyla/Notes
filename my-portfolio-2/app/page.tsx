"use client";

import { useEffect, useState } from "react";
import NoteItem from "./components/NoteItem";

type Note = {
  id: number;
  title: string;
  description: string;
};

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  // Load saved notes
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");

    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Check if the note already exists
  useEffect(() => {
    if (title.trim() === "") return;

    const existingNote = notes.find(
      (note) =>
        note.title.toLowerCase() === title.trim().toLowerCase() &&
        note.id !== editingId
    );

    if (existingNote) {
      console.log("A note with this title already exists.");
    }
  }, [title, notes, editingId]);

  const openNewNote = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
    setShowPopup(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      alert("Please enter a title and description.");
      return;
    }

    const existingNote = notes.find(
      (note) =>
        note.title.toLowerCase() === title.trim().toLowerCase() &&
        note.id !== editingId
    );

    if (existingNote) {
      alert("A note with this title already exists.");
      return;
    }

    if (editingId !== null) {
      setNotes(
        notes.map((note) =>
          note.id === editingId
            ? {
                ...note,
                title: title.trim(),
                description: description.trim(),
              }
            : note
        )
      );
    } else {
      const newNote: Note = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
      };

      setNotes([...notes, newNote]);
    }

    setTitle("");
    setDescription("");
    setEditingId(null);
    setShowPopup(false);
  };

  const handleDelete = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEdit = (note: Note) => {
    setTitle(note.title);
    setDescription(note.description);
    setEditingId(note.id);
    setShowPopup(true);
  };

  const closePopup = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
    setShowPopup(false);
  };

  return (
    <main className="notes-app">
      <div className="notes-container">

        {/* HEADER */}
        <header className="notes-header">
          <p className="label">✦ MY LITTLE NOTES ✦</p>

          <h1>
            Notes <span>✦</span>
          </h1>

          <p>
            A little place for my thoughts, ideas, and reminders.
          </p>
        </header>

        {/* NEW NOTE BUTTON */}
        <div className="new-note-area">
          <button className="new-note-button" onClick={openNewNote}>
            <span>＋</span> New Note
          </button>
        </div>

        {/* POPUP */}
        {showPopup && (
          <div className="popup-overlay" onClick={closePopup}>
            <div
              className="note-popup"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="popup-star">✦</div>

              <button className="close-button" onClick={closePopup}>
                ×
              </button>

              <h2>
                {editingId !== null ? "Edit Note" : "New Note"}
              </h2>

              <form onSubmit={handleSubmit}>
                <label>Title</label>

                <input
                  type="text"
                  placeholder="Give your note a title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoFocus
                />

                <label>Description</label>

                <textarea
                  placeholder="Write something here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={7}
                />

                <div className="popup-buttons">
                  <button type="button" onClick={closePopup}>
                    Cancel
                  </button>

                  <button type="submit">
                    {editingId !== null ? "Save Changes" : "Save Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* NOTES */}
        <section className="notes-section">
          <div className="notes-title">
            <div>
              <span className="section-star">✦</span>
              <h2>My Notes</h2>
            </div>

            <span className="note-count">
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </span>
          </div>

          {notes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✦</div>

              <h3>Your notebook is empty</h3>

              <p>
                Click <b>New Note</b> to write something.
              </p>
            </div>
          ) : (
            <div className="notes-list">
              {notes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </section>

        <footer className="notes-footer">
          Made with little thoughts ✦
        </footer>

      </div>
    </main>
  );
}