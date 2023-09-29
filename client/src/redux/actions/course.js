import { url } from '../store';
import axios from 'axios';

class CourseAction {
  static getAllCourses = (keyword, category) => {
    return async dispatch => {
      try {
        dispatch({ type: 'getAllCourseRequest' });
        const { data } = await axios.get(
          `/api/v2/courses?keyword=${keyword}&category=${category}`
        );
        dispatch({ type: 'getAllCourseSuccess', payload: data });
      } catch (error) {
        dispatch({
          type: 'getAllCourseFail',
          payload: error.response.data,
        });
      }
    };
  };
  static getCourses = id => {
    return async dispatch => {
      try {
        dispatch({ type: 'getCourseRequest' });
        const { data } = await axios.get(`/api/v2/course/${id}`, {
          withCredentials: true,
        });
        dispatch({ type: 'getCourseSuccess', payload: data });
      } catch (error) {
        dispatch({
          type: 'getCourseFail',
          payload: error.response.data,
        });
      }
    };
  };
  
}
export default CourseAction;
