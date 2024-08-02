import { createSlice } from "@reduxjs/toolkit";
import {
  getAllGrades,
  // getAllStudentsInGrade,
  getSchools,
  getAllStudentsInGrade,
  getAllSchools,
  setCurrentStudent,
} from "./thunk";

export const initialState = {
  allschools: [],
  school: [],
  students: [],
  grades: [],
  currentStudent: {},
  error: "",
};

const StudentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllGrades.fulfilled, (state, action) => {
    });
    builder.addCase(getAllGrades.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getSchools.fulfilled, (state, action) => {
      state.school = action.payload;
    });
    builder.addCase(getAllStudentsInGrade.fulfilled, (state, action) => {
      console.log("action: ", action.payload);
      state.students = action.payload.students;
    });
    builder.addCase(getAllSchools.fulfilled, (state, action) => {
      state.allschools = action.payload;
    });
    builder.addCase(setCurrentStudent.fulfilled, (state, action) => {
      state.currentStudent = action.payload;
    });
  },
});

export default StudentsSlice.reducer;
