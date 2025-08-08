import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("All");

  const addTodo = (todo) => {
    const newTodo = { ...todo, id: nextId };
    setTodos((prev) => [...prev, newTodo]);
    setNextId((prev) => prev + 1);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleUpdateTodo = (id, updatedFields) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, ...updatedFields } : todo
      )
    );
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    const savedNextId = localStorage.getItem("nextId");

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    } else {
      setTodos([
        {
          id: 1,
          text: "Learn React basics",
          completed: false,
          priority: "Medium",
          dueDate: "",
          category: "Work",
        },
        {
          id: 2,
          text: "Build a TODO app",
          completed: false,
          priority: "High",
          dueDate: "",
          category: "Personal",
        },
        {
          id: 3,
          text: "Master React hooks",
          completed: false,
          priority: "Low",
          dueDate: "",
          category: "Learning",
        },
      ]);
      setNextId(4);
    }

    if (savedNextId) {
      setNextId(parseInt(savedNextId, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("nextId", nextId.toString());
  }, [nextId]);

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  const filteredTodos = todos

    .filter((todo) =>
      todo.text.toLowerCase().includes(searchText.toLowerCase())
    )

    .filter((todo) => {
      if (filter === "Active") return !todo.completed;
      if (filter === "Completed") return todo.completed;
      if (filter === "Overdue") {
        if (!todo.dueDate) return false;
        return new Date(todo.dueDate) < new Date() && !todo.completed;
      }
      return true;
    })

    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return (
    <div className="App">
      {/* HEADER */}
      <header className="App-header">
        <h1>My TODO App</h1>
      </header>

      <main>
        <AddTodoForm onAddTodo={addTodo} />

        <input
          type="text"
          placeholder="Search TODOs..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Overdue">Overdue</option>
        </select>

        {filteredTodos.length === 0 ? (
          <p className="no-todos">No TODOs found. Try a different search.</p>
        ) : (
          <ul className="todo-list">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={handleUpdateTodo}
              />
            ))}
          </ul>
        )}

        <div className="todo-stats">
          <p>
            Total: {todos.length} | Completed:{" "}
            {todos.filter((t) => t.completed).length}
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
