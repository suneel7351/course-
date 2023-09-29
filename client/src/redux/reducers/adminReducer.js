import { createReducer } from '@reduxjs/toolkit';

const adminReducer = createReducer(
  {
    message: null,
    error: null,
    loading: false,
    users: null,
    courses: null,
  },
  {
    createCourseRequest: state => {
      state.loading = true;
    },
    createCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addLectureRequest: state => {
      state.loading = true;
    },
    addLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addLectureFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCourseRequest: state => {
      state.loading = true;
    },
    deleteCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteCourseFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteLectureRequest: state => {
      state.loading = true;
    },
    deleteLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteLectureFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllUsersRequest: state => {
      state.loading = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getAllUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.users = null;
    },
    changeUserRoleRequest: state => {
      state.loading = true;
    },
    changeUserRoleSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    changeUserRoleFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest: state => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getStatsRequest: state => {
      state.loading = true;
    },
    getStatsSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload.stats;
      state.userCount = action.payload.userCount;
      state.viewsCount = action.payload.viewsCount;
      state.subscriptionsCount = action.payload.subscriptionsCount;
      state.subscriptionPercentage = action.payload.subscriptionPercentage;
      state.viewsPercentage = action.payload.viewsPercentage;
      state.userPercentage = action.payload.userPercentage;
      state.userProfit = action.payload.userProfit;
      state.subscriptionProfit = action.payload.subscriptionProfit;
      state.viewsProfit = action.payload.viewsProfit;
    },
    getStatsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllCoursesRequest: state => {
      state.loading = true;
    },
    getAllCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    getAllCoursesFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.courses = null;
    },
    clearMessage: state => {
      state.message = null;
    },
    clearError: state => {
      state.error = null;
    },
  }
);

export default adminReducer;
