import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Include Both Helper File with needed methods
// import {
//   getTodos as getTodosApi,
//   addNewTodo as addNewTodoApi,
//   updateTodo as updateTodoApi,
//   deleteTodo as deleteTodoApi,
//   getProjects as getProjectsApi,
//   addNewProject as addNewProjectApi,
// } from "../../helpers/fakebackend_helper";

export const getAllUsers = createAsyncThunk("todos/getAllUsers", async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/users/");
    return response;
  } catch (error) {
    return error;
  }
});

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  try {
    const response = { name: "", hello: "yes" };
    return response;
  } catch (error) {
    return error;
  }
});

export const addNewTodo = createAsyncThunk("todos/addNewTodo", async (todo) => {
  try {
    const response = { name: "", hello: "yes" };
    const data = response;
    toast.success("Todo Added Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Todo Added Failed", { autoClose: 3000 });
    return error;
  }
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async (todo) => {
  try {
    const response = { name: "", hello: "yes" };
    const data = response;
    toast.success("Todo Updated Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Todo Updated Failed", { autoClose: 3000 });
    return error;
  }
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (todo) => {
  try {
    const response = { name: "", hello: "yes" };
    const data = response;
    toast.success("Todo Delete Successfully", { autoClose: 3000 });
    return data;
  } catch (error) {
    toast.error("Todo Delete Failed", { autoClose: 3000 });
    return error;
  }
});

export const getProjects = createAsyncThunk("todos/getProjects", async () => {
  try {
    const response = { name: "", hello: "yes" };
    return response;
  } catch (error) {
    return error;
  }
});

export const addNewProject = createAsyncThunk(
  "todos/addNewProject",
  async (project) => {
    try {
      const response = { name: "", hello: "yes" };
      const data = response;
      toast.success("Project Added Successfully", { autoClose: 3000 });
      return data;
    } catch (error) {
      toast.error("Project Added Failed", { autoClose: 3000 });
      return error;
    }
  }
);
