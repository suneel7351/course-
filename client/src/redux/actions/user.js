import { url } from '../store';
import axios from 'axios';
class User {
  static login = (email, password) => {
    return async dispatch => {
      try {
        dispatch({ type: 'loginRequest' });
        const { data } = await axios.post(
          `/api/v1/login`,
          {
            email,
            password,
          },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        dispatch({ type: 'loginSuccess', payload: data });
      } catch (error) {
        dispatch({ type: 'loginFail', payload: error.response.data });
      }
    };
  };
  static register = formData => {
    return async dispatch => {
      try {
        dispatch({ type: 'registerRequest' });
        const { data } = await axios.post(`/api/v1/register`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        });
        dispatch({ type: 'registerSuccess', payload: data });
      } catch (error) {
        dispatch({ type: 'registerFail', payload: error.response.data });
      }
    };
  };
  static getUser = () => {
    return async dispatch => {
      try {
        dispatch({ type: 'getUserRequest' });
        const { data } = await axios.get(`/api/v1/me`, {
          withCredentials: true,
        });
        dispatch({ type: 'getUserSuccess', payload: data });
      } catch (error) {
        dispatch({ type: 'getUserFail', payload: error.response.data });
      }
    };
  };
  static logout = () => {
    return async dispatch => {
      try {
        dispatch({ type: 'logoutRequest' });
        const { data } = await axios.get(`/api/v1/logout`, {
          withCredentials: true,
        });

        dispatch({ type: 'logoutSuccess', payload: data });
      } catch (error) {
        dispatch({ type: 'logoutFail', payload: error.response.data });
      }
    };
  };
  static addToPlaylist = courseId => {
    return async dispatch => {
      try {
        dispatch({ type: 'addToPlaylistRequest' });
        const { data } = await axios.post(
          `/api/v1/add-to-playlist`,
          {
            courseId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        dispatch({ type: 'addToPlaylistSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'addToPlaylistFail',
          payload: error.response.data.message,
        });
      }
    };
  };
  static removeFromPlaylist = courseId => {
    return async dispatch => {
      try {
        dispatch({ type: 'removeFromPlaylistRequest' });
        const { data } = await axios.post(
          `/api/v1/remove-from-playlist`,
          {
            courseId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        dispatch({ type: 'removeFromPlaylistSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'removeFromPlaylistFail',
          payload: error.response.data.message,
        });
      }
    };
  };
  static updateProfilePic = pic => {
    return async dispatch => {
      try {
        dispatch({ type: 'updateProfilePicRequest' });
        const { data } = await axios.put(
          `/api/v1/update-profile-pic`,
          pic,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );
        dispatch({ type: 'updateProfilePicSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'updateProfilePicFail',
          payload: error.response.data.message,
        });
      }
    };
  };
  static updateProfile = (name, email) => {
    return async dispatch => {
      try {
        dispatch({ type: 'updateProfileRequest' });
        const { data } = await axios.put(
          `/api/v1/updateprofile`,
          { name, email },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        dispatch({ type: 'updateProfileSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'updateProfileFail',
          payload: error.response.data.message,
        });
      }
    };
  };
  static updatePassword = (oldPassword, newPassword) => {
    return async dispatch => {
      try {
        dispatch({ type: 'updatePasswordRequest' });
        const { data } = await axios.put(
          `/api/v1/changepassword`,
          { oldPassword, newPassword },
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );
        dispatch({ type: 'updatePasswordSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'updatePasswordFail',
          payload: error.response.data.message,
        });
      }
    };
  };
}

export default User;
