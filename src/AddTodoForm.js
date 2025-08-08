import React, { useState } from "react";

function AddTodoForm({ onAddTodo }) {
  const [inputText, setInputText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("Work");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputText.trim() === "") return;

    const newTodo = {
      text: inputText.trim(),
      priority,
      dueDate,
      category,
      completed: false,
    };

    onAddTodo(newTodo);

    setInputText("");
    setPriority("Medium");
    setDueDate("");
    setCategory("Work");
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter a new TODO..."
        className="todo-input"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="priority-select"
      >
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="due-date-input"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Shopping">Shopping</option>
      </select>

      <button type="submit" className="add-btn">
        Add TODO
      </button>
    </form>
  );
}

export default AddTodoForm;
