import { useEffect, useState } from "react";
import "./TodoApp.css";

function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  //Handles adding the task to storage
  const handleAddTask = () => {
    addTodo(task);
    setTask("");
  };

  //Sets the task while typing
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  //Allows user to add tasks by pressing enter instead of clicking the button
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAddTask();
  };

  //Handles removing task with their IDs
  const handleRemoveTask = (id) => {
    removeTodo(id);
  };

  useEffect(() => {
    getTodos();
  }, []);

  //API request to backend for adding tasks
  const addTodo = (task) => {
    if (!task) return console.log("Please provide a task");

    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    })
      .then(() => {
        //Update todo list
        getTodos();
      })
      .catch((err) => {
        console.log(`Error adding ${err}`);
      });
  };

  //API request for fetching the tasks in storage
  const getTodos = () => {
    fetch("http://localhost:3000/todos")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTodos(data);
        //Update todo list
        getTodos();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const removeTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    }).catch((err) => {
      console.log(`Error removing task ${err}`);
    });
  };

  return (
    <div className='todo'>
      <h1>To Do List</h1>
      <div className='add-todo'>
        <label htmlFor='todo'>Enter the task:</label>
        <input
          type='text'
          placeholder='Add Todo...'
          name='todo'
          value={task}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddTask}>Add task</button>
      </div>
      <ul className='tasks'>
        {!todos.length ? (
          <li className='task-item' style={{ backgroundColor: "lightgreen" }}>
            No tasks!
          </li>
        ) : (
          //Sort the tasks with their date
          todos
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((todo) => (
              <li key={todo.id} className='task-item'>
                <span>{todo.task}</span>
                <button className='removeTask' onClick={() => handleRemoveTask(todo.id)}>
                  X
                </button>
              </li>
            ))
        )}
      </ul>
    </div>
  );
}

export default TodoApp;
