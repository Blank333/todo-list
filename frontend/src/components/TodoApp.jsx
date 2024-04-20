import { useState } from "react";
import "./TodoApp.css";

function TodoApp() {
  const [task, setTask] = useState("");

  //Handles adding the task to storage
  const handleAddTask = () => {
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
      <div className='tasks'></div>
    </div>
  );
}

export default TodoApp;
