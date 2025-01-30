import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [notes, setNotes] = useState([]);

  const colors = ["#FFFC96", "#FFB6C1", "#C1FFC1", "#ADD8E6", "#FFD700"];

  const addNote = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const newNote = {
      id: Date.now(), 
      text: "New Note",
      x: Math.random() * 300,
      y: Math.random() * 300,
      color: randomColor,
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const updateNote = (id, updates) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === id ? { ...note, ...updates } : note))
    );
  };

  const handleDragEnd = (event, id) => {
    const { clientX, clientY } = event;
    updateNote(id, { x: clientX, y: clientY });
  };

  return (
    <div className="app">
      <button className="add-note-btn" onClick={addNote}>
        Add Note
      </button>
      <div className="board">
        {notes.map((note) => (
          <div
            key={note.id}
            className="note"
            style={{
              top: note.y,
              left: note.x,
              backgroundColor: note.color, 
            }}
            draggable
            onDragEnd={(e) => handleDragEnd(e, note.id)}
          >
            <textarea
              value={note.text}
              onChange={(e) => updateNote(note.id, { text: e.target.value })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
