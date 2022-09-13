import { createSlice } from "@reduxjs/toolkit";
const axios = require("axios");
const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const todoSlide = createSlice({
  name: "todo",
  initialState: {
    data: []
  },
  reducers: {
    addTodo: (state, action) => {
      state.data.push(action.payload);
    },
    getTodo: (state, action) => {
      state.data = [action.payload];
    }
  }
});

export const getTodoAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/${data}`);
    dispatch(getTodo(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export const addTodoAsync = (data) => async (dispatch) => {
  try {
    // console.log(data);
    const response = await axios.post(API_URL, data);
    // console.log(response);
    dispatch(addTodo(response.data));
  } catch (err) {
    throw new Error(err);
  }
};

export const { addTodo, getTodo } = todoSlide.actions;
export const showTodo = (state) => state.todo.data;
export default todoSlide.reducer;





///////////////////////////////////////////

import "./styles.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodoAsync, addTodoAsync, showTodo } from "./features/todoSlice";

export default function App() {
  const todo = useSelector(showTodo);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState({
    userId: 69,
    id: 69,
    title: "",
    completed: false
  });

  const addNewTodo = () => {
    dispatch(addTodoAsync(newTodo));
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input
        onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
      />
      <button onClick={addNewTodo}>Add new todo</button>
      {todo.map((item) => {
        return <p key={item.id}>{item.title}</p>;
      })}
      <button onClick={() => dispatch(getTodoAsync("5"))}>GET TODO</button>
    </div>
  );
}
