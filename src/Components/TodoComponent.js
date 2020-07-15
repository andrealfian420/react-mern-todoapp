import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { validateString } from "../helper/helpers";

import Logo from "../assets/nagato.png";

// Styled Component
const TodoContainer = styled.div`
  @media (min-width: 768px) {
    width: 55%;
  }

  width: 80%;
  position: relative;
  border-radius: 15px;
  background: #4aa4d9;
  box-shadow: 5px -5px 10px #3d88b4, -5px 5px 10px #57c0fe;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
`;

const HeaderLogo = styled.h1`
  background: url(${Logo}) no-repeat center;
  margin-bottom: 0;
  text-indent: -10000px;
`;

const TodoForm = styled.form`
  &:after {
    margin: 0;
    content: "";
    display: block;
    clear: both;
  }
`;

const TodoInput = styled.input`
  @media (min-width: 768px) {
    width: 70%;
  }
  width: 80%;
  padding: 20px;
  border-radius: 10px;
  background: #4aa4d9;
  box-shadow: 5px 5px 10px #3e8ab6, -5px -5px 10px #56befc;
  border: 0;
  float: left;
  font-size: 20px;

  &::placeholder {
    color: #001f3f;
  }
`;

const BtnSubmit = styled.button`
  @media (min-width: 768px) {
    width: 30%;
  }

  width: 95%;
  padding: 15px;
  margin-top: 10px;
  float: left;
  border-radius: 10px;
  background: #4aa4d9;
  box-shadow: 5px 5px 10px #3e8ab6, -5px -5px 10px #56befc;
  color: #001f3f;
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 20px;
`;

const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  width: 100%;
  color: #001f3f;
  padding: 20px;
  box-sizing: border-box;
  font-family: arial;
  font-size: 20px;
  cursor: pointer;
  letter-spacing: 1px;
`;

const RemoveDone = styled.button`
  @media (min-width: 768px) {
    margin: 0;
    width: 25%;
  }
  margin-top: 10px;
  border-radius: 10px;
  background: #4aa4d9;
  box-shadow: 5px 5px 10px #3e8ab6, -5px -5px 10px #56befc;
  color: #001f3f;
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 20px;
`;
// End of Styled Components

const TodoComponent = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      task: "Sleep with fishes",
      done: false,
    },
    {
      id: 2,
      task: "Eat breakfast",
      done: false,
    },
  ]);

  useEffect(() => {
    console.log("todoComponent mounted !");
    document.title = "MERN Todoapp";
  }, []);

  useEffect(() => {
    const isAnyDoneTodo = todos.some((todo) => todo.done === true);

    isAnyDoneTodo ? setIsAnyDoneTodo(true) : setIsAnyDoneTodo(false);
  }, [todos]);

  const [todo, setTodo] = useState(null);
  const [isAnyDoneTodo, setIsAnyDoneTodo] = useState(false);

  // change state value based on user input
  const handleTodoInput = (e) => {
    setTodo(e.target.value);
  };

  // Handle delete data
  const handleTodoDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos([...newTodos]);
  };

  // Handle mark as done button
  const handleMarkAsDone = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const updateTodo = [...todos];

    updateTodo[todoIndex].done === true
      ? (updateTodo[todoIndex].done = false)
      : (updateTodo[todoIndex].done = true);

    setTodos([...updateTodo]);
  };

  // Handle removing all completed todo
  const handleRemoveDone = () => {
    const undoneTodo = todos.filter((todo) => todo.done === false);

    setTodos([...undoneTodo]);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validTodo = validateString(todo.trim());

    if (validTodo === false) {
      return alert("Task tidak valid");
    }

    const newTodo = {
      id: Math.random() * 1000,
      task: validTodo,
      done: false,
    };

    const testing = JSON.stringify(newTodo);
    console.log(testing);

    setTodos([...todos, newTodo]);
    setTodo(null);
    document.getElementById("task").value = "";
  };

  const preventOpenLink = (e) => {
    e.preventDefault();
  };

  // Template for mapping todo into html format
  const todoItems = todos.length ? (
    todos.map((todo) => {
      return (
        <ListItem
          key={todo.id}
          style={
            todo.done
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          {todo.task}
          <a href="/" onClick={preventOpenLink}>
            <span
              onClick={() => handleMarkAsDone(todo.id)}
              style={{
                float: "right",
                marginLeft: "10px",
                background: "green",
                padding: "1px 5px 1px 5px",
                color: "white",
                borderRadius: "10px",
                fontSize: "15px",
              }}
            >
              Mark as done
            </span>
          </a>
          <a href="/" onClick={preventOpenLink}>
            <span
              onClick={() => handleTodoDelete(todo.id)}
              style={{
                float: "right",
                marginLeft: "10px",
                background: "red",
                padding: "1px 5px 1px 5px",
                color: "white",
                borderRadius: "10px",
                fontSize: "15px",
              }}
            >
              Delete
            </span>
          </a>
        </ListItem>
      );
    })
  ) : (
    <p style={{ color: "#001f3f" }}>No task present</p>
  );

  return (
    <div>
      <HeaderLogo>Test</HeaderLogo>
      <TodoContainer>
        <TodoForm onSubmit={handleSubmit}>
          <TodoInput
            type="text"
            name="task"
            required
            id="task"
            placeholder="Input your task here..."
            onChange={handleTodoInput}
          />
          <BtnSubmit>Add Task</BtnSubmit>
        </TodoForm>
        <ListContainer>{todoItems}</ListContainer>
        {isAnyDoneTodo ? (
          <RemoveDone onClick={handleRemoveDone}>Clear done todo</RemoveDone>
        ) : (
          ""
        )}
      </TodoContainer>
    </div>
  );
};

export default TodoComponent;
