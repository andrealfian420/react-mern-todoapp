import React, { useEffect } from "react";
import styled from "styled-components";

import Logo from "../assets/nagato.png";

// Styled Component
const TodoContainer = styled.div`
  position: relative;
  width: 55%;
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
  &::after {
    margin: 0;
    content: "";
    display: block;
    clear: both;
  }
`;

const TodoInput = styled.input`
  width: 70%;
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
  padding: 20px;
  margin-top: 10px;
  width: 30%;
  float: left;
  border-radius: 10px;
  background: #4aa4d9;
  box-shadow: 5px 5px 10px #3e8ab6, -5px -5px 10px #56befc;
  border: 0;
  box-sizing: border-box;
  color: #001f3f;
  cursor: pointer;
  font-size: 20px;
`;

const TodoComponent = () => {
  useEffect(() => {
    console.log("todoComponent mounted !");
    document.title = "MERN Todoapp";
  }, []);

  return (
    <div>
      <HeaderLogo>Test</HeaderLogo>
      <TodoContainer>
        <TodoForm>
          <TodoInput type="text" placeholder="Input your task here..." />
          <BtnSubmit type="submit">Add Task</BtnSubmit>
        </TodoForm>
      </TodoContainer>
    </div>
  );
};

export default TodoComponent;
