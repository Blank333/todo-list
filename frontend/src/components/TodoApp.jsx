import { useEffect, useState } from "react";
import "./TodoApp.css";

function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [taskID, setTaskID] = useState(1);

  //Handles adding the task to storage
  const handleAddTask = () => {
    addTodo(task);
    //Update todo list
    getTodos();
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

  useEffect(() => {
    getTodos();
  }, []);

  //API request to backend for adding tasks
  const addTodo = (task) => {
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskID: taskID.toString(), task }),
    })
      .then(() => {
        console.log(`Added successfully with ID:${taskID}`);
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
        //Track the ID for node persist storage
        setTaskID(data.length + 1);
      })
      .catch((err) => {
        console.error(err);
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
          <li style={{ backgroundColor: "lightgreen" }}>No tasks!</li>
        ) : (
          //Sort the tasks with their ID (so new tasks appear on the bottom)
          todos.sort((a, b) => parseInt(a.key) > parseInt(b.key)).map((todo) => <li key={todo.key}>{todo.value}</li>)
        )}
      </ul>
    </div>
  );
}

export default TodoApp;
