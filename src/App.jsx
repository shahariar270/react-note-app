import { useState } from "react";

function App() {
  const [items, setItems] = useState("");
  const [list, setList] = useState([]);
  const [notes, setNotes] = useState(null);
  const [edit, setEdit] = useState(false);

  const editHandler = (noteId) => {
    const editor = list.find((item) => item.id === noteId);
    setEdit(true);
    setNotes(editor);
    setItems(editor.title);
  };

  const changeHandler = (e) => {
    e.preventDefault();
    if (items) {
      const note = {
        id: Date.now(),
        title: items,
        completed: false,
      };

      setList([...list, note]);
      setItems("");
    } else {
      alert("Please enter a valid value.");
    }
  };

  const deleteHandle = (newId) => {
    const newNote = list.filter((item) => item.id !== newId);
    setList(newNote);
  };

  const updateHandler = (event) => {
    event.preventDefault();
    
    setList(list.map((item) => {
      if (item.id === notes.id) {
        return { ...item, title: items };
      }
      return item;
    }));
    
    setEdit(false);
    setNotes(null);
    setItems("");
  };

  return (
    <>
      <div className="container">
        <form
          className="flex justify-center items-center m-auto mt-10"
          onSubmit={(event) => {
            edit ? updateHandler(event) : changeHandler(event);
          }}
        >
          <input
            type="text"
            placeholder="Enter a note"
            className="p-2 border border-blue-500 rounded"
            value={items}
            onChange={(e) => setItems(e.target.value)}
          />

          <button type="submit" className="btn">
            {edit ? "Update Now" : "Add Note"}
          </button>
        </form>

        <ul className="text-center m-auto">
          {list.map((note) => (
            <li key={note.id}>
              <span className="mx-5 text-xl">{note.title}</span>
              <button
                onClick={() => editHandler(note.id)}
                className="m-4 bg-sky-500 px-5 py-2 text-white font-bold rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteHandle(note.id)}
                className="bg-red-500 px-5 py-2 text-white font-bold rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
