import React, { useState } from "react";

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const { id, text, completed, priority, dueDate, category } = todo;

  // Editing state
  const [isEditing, setIsEditing] = useState(false);

  // Editable fields
  const [editText, setEditText] = useState(text);
  const [editPriority, setEditPriority] = useState(priority || "Medium");
  const [editDueDate, setEditDueDate] = useState(dueDate || "");
  const [editCategory, setEditCategory] = useState(category || "Work");

  const handleSave = () => {
    onUpdate(id, {
      text: editText,
      priority: editPriority,
      dueDate: editDueDate,
      category: editCategory,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(text);
    setEditPriority(priority || "Medium");
    setEditDueDate(dueDate || "");
    setEditCategory(category || "Work");
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${completed ? "completed" : ""}`}>
      <div className="todo-main">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />

        {isEditing ? (
          <>
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Shopping</option>
            </select>

            {/* Action buttons */}
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </>
        ) : (
          <>
            <span className="todo-text">{text}</span>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </>
        )}

        <button onClick={() => onDelete(id)} className="delete-btn">
          Delete
        </button>
      </div>

      {!isEditing && (
        <div className="todo-info">
          {priority && (
            <span className={`priority priority-${priority.toLowerCase()}`}>
              Priority: {priority}
            </span>
          )}
          {dueDate && (
            <span className="due-date">
              Due: {new Date(dueDate).toLocaleDateString()}
            </span>
          )}
          {category && <span className="category">Category: {category}</span>}
        </div>
      )}
    </li>
  );
}

export default TodoItem;
