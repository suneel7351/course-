import { createReducer } from '@reduxjs/toolkit';

const userReducer = createReducer(
  {
    loading: false,
    isLogged: false,
    message: null,
    error: null,
    user: null,
  },
  {
    getUserRequest: state => {
      state.loading = true;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.isLogged = true;
      state.user = action.payload.user;
    },
    getUserFail: (state, action) => {
      state.loading = false;
      state.isLogged = false;
      state.error = action.payload.message;
    },
    loginRequest: state => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLogged = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isLogged = false;
      state.error = action.payload.message;
      state.user = null;
    },
    registerRequest: state => {
      state.loading = true;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.isLogged = true;
      state.message = action.payload.message;
      state.user = action.payload.user;
    },
    registerFail: (state, action) => {
      state.loading = false;
      state.isLogged = false;
      state.error = action.payload.message;
      state.user = null;
    },
    logoutRequest: state => {
      state.loading = true;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.isLogged = false;
      state.user = null;
      state.message = action.payload.message;
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.isLogged = true;
      state.error = action.payload.message;
    },

    addToPlaylistRequest: state => {
      state.loading = true;
    },
    addToPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addToPlaylistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromPlaylistRequest: state => {
      state.loading = true;
    },
    removeFromPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    removeFromPlaylistFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfilePicRequest: state => {
      state.loading = true;
    },
    updateProfilePicSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateProfilePicFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePasswordRequest: state => {
      state.loading = true;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updatePasswordFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileRequest: state => {
      state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateProfileFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);

export default userReducer;
