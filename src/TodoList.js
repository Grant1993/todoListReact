import React, { useState } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function TodoList() {
  const [state, setState] = useState({
    todos: [],
  });
  function create(newTodo) {
    setState((prev) => ({
      ...prev,
      todos: [...state.todos, newTodo],
    }));
  }
  function remove(id) {
    setState((prev) => ({
      ...prev,
      todos: state.todos.filter((t) => t.id !== id),
    }));
  }
  function update(id, updatedTask) {
    const updatedTodos = state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
    setState((prev) => ({
      ...prev,
      todos: updatedTodos,
    }));
  }
  function toggleCompletion(id) {
    const updatedTodos = state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setState((prev) => ({
      ...prev,
      todos: updatedTodos,
    }));
  }
  const todos = state.todos.map((todo) => {
    return (
      <CSSTransition key={todo.id} timeout={500} classNames='todo'>
        <Todo
          key={todo.id}
          id={todo.id}
          task={todo.task}
          completed={todo.completed}
          removeTodo={remove}
          updateTodo={update}
          toggleTodo={toggleCompletion}
        />
      </CSSTransition>
    );
  });
  return (
    <div className='TodoList'>
      <h1>To do list!</h1>
      <NewTodoForm createTodo={create} />

      <ul>
        <TransitionGroup className='todo-list'>{todos}</TransitionGroup>
      </ul>
    </div>
  );
}

export default TodoList;
