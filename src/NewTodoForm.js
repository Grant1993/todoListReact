import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function NewTodoForm(props) {
  const [state, setState] = useState({
    task: "",
  });
  function handleChange(evt) {
    setState((prev) => ({
      ...prev,
      [evt.target.name]: evt.target.value,
    }));
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    props.createTodo({ ...state, id: uuidv4(), completed: false });
    setState({ task: "" });
  }
  return (
    <form className='NewTodoForm' onSubmit={handleSubmit}>
      <label htmlFor='task'>New Todo</label>
      <input
        type='text'
        placeholder='New Todo'
        id='task'
        name='task'
        value={state.task}
        onChange={handleChange}
      />
      <button>Add Todo</button>
    </form>
  );
}

export default NewTodoForm;
