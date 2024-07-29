import { createSlice } from "@reduxjs/toolkit";
import {
  getAllGrades,
  // getAllStudentsInGrade,
  getSchools,
  getAllStudentsInGrade,
  getAllSchools,
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
      state.grades = action.payload;
    });
    builder.addCase(getAllGrades.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(getSchools.fulfilled, (state, action) => {
      console.log("THE ACTION: ", action);
      state.school = action.payload;
    });
    builder.addCase(getAllStudentsInGrade.fulfilled, (state, action) => {
      console.log("action: ", action);
    });
    builder.addCase(getAllSchools.fulfilled, (state, action) => {
      state.allschools = action.payload;
    });
  },
});

export default StudentsSlice.reducer;
