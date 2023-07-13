import React, { useState } from "react";
import "./Todo.css";

function Todo(props) {
  const [state, setState] = useState({
    isEditing: false,
    task: props.task,
  });
  function handleRemove() {
    props.removeTodo(props.id);
  }
  function toggleForm() {
    setState((prev) => ({ ...prev, isEditing: !state.isEditing }));
  }
  function handleUpdate(evt) {
    evt.preventDefault();
    props.updatedTodo(props.id, state.task);
    setState((prev) => ({ ...prev, isEditing: false }));
  }
  function handleChange(evt) {
    setState((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  }
  function handleToggle(evt) {
    props.toggleTodo(props.id);
  }

  let result;
  if (state.isEditing) {
    result = (
      <div className='Todo'>
        <form className="Todo-edit-form" onSubmit={handleUpdate}>
          <input
            type='text'
            value={state.task}
            name='task'
            onChange={handleChange}
          />
          <button>Save</button>
        </form>
      </div>
    );
  } else {
    result = (
      <div className='Todo'>
        <li
          className={props.completed ? "Todo-task completed" : "Todo-task"}
          onClick={handleToggle}
        >
          {props.task}
        </li>
        <div className="Todo-buttons">
          <button onClick={toggleForm}><i class='fas fa-pen'></button>
          <button onClick={handleRemove}><i class='fas fa-trash'></button>
        </div>
      </div>
    );
  }
  return result;
}

export default Todo;
