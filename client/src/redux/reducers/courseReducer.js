import { createReducer } from '@reduxjs/toolkit';

const courseReducer = createReducer(
  {
    loading: false,
    courses: [],
    error: null,
    message: null,
    lectures: [],
  },
  {
    getAllCourseRequest: state => {
      state.loading = true;
    },
    getAllCourseSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload.courses;
    },
    getAllCourseFail: (state, action) => {
      state.loading = false;
      state.courses = [];
      state.error = action.payload.message;
    },
    getCourseRequest: state => {
      state.loading = true;
    },
    getCourseSuccess: (state, action) => {
      state.loading = false;
      state.lectures = action.payload.lectures;
    },
    getCourseFail: (state, action) => {
      state.loading = false;
      state.lectures = [];
      state.error = action.payload.message;
    },
   
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);

export default courseReducer;
