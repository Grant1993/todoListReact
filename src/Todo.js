import React, { useState } from "react";
import "./Todo.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

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
    props.updateTodo(props.id, state.task);
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
      <CSSTransition key='editing' timeout={500} classNames='form'>
        <form className='Todo-edit-form' onSubmit={handleUpdate}>
          <input
            type='text'
            value={state.task}
            name='task'
            onChange={handleChange}
          />
          <button>Save</button>
        </form>
      </CSSTransition>
    );
  } else {
    result = (
      <CSSTransition key='normal' timeout={500} classNames='task-text'>
        <li className='Todo-task' onClick={handleToggle}>
          {props.task}
        </li>
      </CSSTransition>
    );
  }
  return (
    <TransitionGroup className={props.completed ? "Todo completed" : "Todo"}>
      {result}
      <div className='Todo-buttons'>
        <button onClick={toggleForm}>
          <FaPencilAlt />
        </button>
        <button onClick={handleRemove}>
          <FaTrashAlt />
        </button>
      </div>
    </TransitionGroup>
  );
}

export default Todo;
