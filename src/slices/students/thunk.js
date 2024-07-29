import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSchools = createAsyncThunk(
  "students/getSchools",
  async (schoolId) => {
    try {
      const NumSchoolId = Number(schoolId)
      const response = await axios.get(
        `http://localhost:5000/api/schools/admin/${NumSchoolId}`
      );
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getAllGrades = createAsyncThunk(
  "students/getAllGrades",
  async () => {
    try {
      const response = await axios.get("");
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getAllStudentsInGrade = createAsyncThunk(
  "students/getAllStudentsInGrade",
  async () => {
    try {
      // console.log()
      const response = await axios.get(
        "http://localhost:5000/api/schools/what"
      );
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const getAllSchools = createAsyncThunk(
  "students/getAllSchools",
  async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/schools/all");
      return response;
    } catch (error) {
      return error;
    }
  }
);
