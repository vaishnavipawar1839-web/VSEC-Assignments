import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("All");

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([
      ...tasks,
      { id: Date.now(), text: task, completed: false }
    ]);

    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const filteredTasks = tasks.filter((item) => {
    if (activeTab === "Pending") return !item.completed;
    if (activeTab === "Completed") return item.completed;
    return true;
  });

  return (
    <div className="app">
      <div className="todo-card">
        <h1>My To-Do List</h1>
        <p className="subtitle">Organize your daily tasks</p>

        <div className="task-input">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <div className="tabs">
          {["All", "Pending", "Completed"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="empty">No tasks here yet.</p>
          ) : (
            filteredTasks.map((item) => (
              <div className="task" key={item.id}>
                <label className={item.completed ? "done" : ""}>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTask(item.id)}
                  />
                  {item.text}
                </label>

                <button
                  className="delete"
                  onClick={() => deleteTask(item.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <p className="total">
          Total tasks: {tasks.length}
        </p>
      </div>
    </div>
  );
}

export default App;