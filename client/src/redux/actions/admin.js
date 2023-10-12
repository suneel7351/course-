import { url } from '../store';
import axios from 'axios';

class AdminAction {
  static createCourse = formData => {
    return async dispatch => {
      try {
        dispatch({ type: 'createCourseRequest' });
        const { data } = await axios.post(`/api/v2/create`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
        dispatch({ type: 'createCourseSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'createCourseFail',
          payload: error.response.data.message,
        });
      }
    };
  };




  static updateCourse = (formData,id) => {
    return async dispatch => {
      try {
        dispatch({ type: 'updateCourseRequest' });
        const { data } = await axios.put(`/api/v2/update/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
        dispatch({ type: 'updateCourseSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'updateCourseFail',
          payload: error.response.data.message,
        });
      }
    };
  };
  static addLecture = (formData, id) => {
    return async dispatch => {
      try {
        dispatch({ type: 'addLectureRequest' });
        const { data } = await axios.post(
          `/api/v2/course/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );
        dispatch({ type: 'addLectureSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'addLectureFail',
          payload: error.response.data.message,
        });
      }
    };
  };


  static updateLecture = (lectureId,formData, id) => {
    return async dispatch => {
      try {
        dispatch({ type: 'updateLectureRequest' });
        const { data } = await axios.put(
          `/api/v2/course/lecture/update?courseId=${id}&lectureId=${lectureId}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
          }
        );
        dispatch({ type: 'updateLectureSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'updateLectureFail',
          payload: error.response.data.message,
        });
      }
    };
  };
  static deleteCourse = id => {
    return async dispatch => {
      try {
        dispatch({ type: 'deleteCourseRequest' });
        const { data } = await axios.delete(`/api/v2/course/${id}`, {
          withCredentials: true,
        });

        dispatch({ type: 'deleteCourseSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'deleteCourseFail',
          payload: error.response.data.message,
        });
      }
    };
  };
  static deleteLecture = (lectureId, courseId) => {
    return async dispatch => {
      try {
        dispatch({ type: 'deleteLectureRequest' });
        const { data } = await axios.delete(
          `/api/v2/lecture?courseId=${courseId}&lectureId=${lectureId}`,
          {
            withCredentials: true,
          }
        );

        dispatch({ type: 'deleteLectureSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'deleteLectureFail',
          payload: error.response.data.message,
        });
      }
    };
  };
  static getAllUsers = () => {
    return async dispatch => {
      try {
        dispatch({ type: 'getAllUsersRequest' });
        const { data } = await axios.get(`/api/v1/admin/users`, {
          withCredentials: true,
        });

        dispatch({ type: 'getAllUsersSuccess', payload: data.users });
      } catch (error) {
        dispatch({
          type: 'getAllUsersFail',
          payload: error.response.data.message,
        });
      }
    };
  };
  static changeUserRole = id => {
    return async dispatch => {
      try {
        dispatch({ type: 'changeUserRoleRequest' });
        const { data } = await axios.put(`/api/v1/admin/user/${id}`, {
          withCredentials: true,
        });

        dispatch({ type: 'changeUserRoleSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'changeUserRoleFail',
          payload: error.response.data.message,
        });
      }
    };
  };
  static deleteUser = id => {
    return async dispatch => {
      try {
        dispatch({ type: 'deleteUserRequest' });
        const { data } = await axios.delete(`/api/v1/admin/user/${id}`, {
          withCredentials: true,
        });

        dispatch({ type: 'deleteUserSuccess', payload: data.message });
      } catch (error) {
        dispatch({
          type: 'deleteUserFail',
          payload: error.response.data.message,
        });
      }
    };
  };
  static getStats = () => {
    return async dispatch => {
      try {
        dispatch({ type: 'getStatsRequest' });
        const { data } = await axios.get(`/api/v4/admin/stats`, {
          withCredentials: true,
        });

        dispatch({ type: 'getStatsSuccess', payload: data });
      } catch (error) {
        dispatch({
          type: 'getStatsFail',
          payload: error.response.data.message,
        });
      }
    };
  };
  static getAllCourses = () => {
    return async dispatch => {
      try {
        dispatch({ type: 'getAllCoursesRequest' });
        const { data } = await axios.get(`/api/v2/admin/courses`, {
          withCredentials: true,
        });

        dispatch({ type: 'getAllCoursesSuccess', payload: data.courses });
      } catch (error) {
        dispatch({
          type: 'getAllCoursesFail',
          payload: error.response.data.message,
        });
      }
    };
  };
}

export default AdminAction;
