import { createReducer } from '@reduxjs/toolkit';

const getUserReducer = createReducer(
  {
    loading: false,
    isLogged: false,
    message: null,
    error: null,
    user: null,
  },
  {
   
  }
);

export default getUserReducer;
