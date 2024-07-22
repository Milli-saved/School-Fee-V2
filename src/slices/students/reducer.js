import { createSlice } from "@reduxjs/toolkit";
export const initialState = {
  students: [],
  grades: [],
};

const StudentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
});

export default StudentsSlice.reducer;
