import { url } from '../store';
import axios from 'axios';
class Other {
  static forgetPassword = email => {
    return async dispatch => {
      try {
        dispatch({ type: 'forgetPasswordRequest' });
        const { data } = await axios.post(
          `/api/v1/forgetpassword`,
          {
            email,
          },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        dispatch({ type: 'forgetPasswordSuccess', payload: data.message });
      } catch (error) {
        dispatch({ type: 'forgetPasswordFail', payload: error.response.data });
      }
    };
  };
  static resetPassword = (password, token) => {
    return async dispatch => {
      try {
        dispatch({ type: 'resetPasswordRequest' });
        const { data } = await axios.put(
          `/api/v1/reset-password/${token}`,
          {
            password,
          },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        dispatch({ type: 'resetPasswordSuccess', payload: data.message });
      } catch (error) {
        dispatch({ type: 'resetPasswordFail', payload: error.response.data });
      }
    };
  };
}

export default Other;
