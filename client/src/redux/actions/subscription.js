import { url } from '../store';
import axios from 'axios';

class Subscription {
  static enrollCourse = () => {
    return async dispatch => {
      try {
        dispatch({ type: 'buySubscriptionRequest' });
        const { data } = await axios.get(`/api/v3/subscribe`, {
          withCredentials: true,
        });
        dispatch({
          type: 'buySubscriptionSuccess',
          payload: data.subscription_id,
        });
      } catch (error) {
        dispatch({
          type: 'buySubscriptionFail',
          payload: error.response.data.message,
        });
      }
    };
  };
  static cancelSubscription = () => {
    return async dispatch => {
      try {
        dispatch({ type: 'cancelSubscriptionRequest' });
        const { data } = await axios.delete(`/api/v3/subsribe/cancel`, {
          withCredentials: true,
        });
        dispatch({
          type: 'cancelSubscriptionSuccess',
          payload: data.message,
        });
      } catch (error) {
        dispatch({
          type: 'cancelSubscriptionFail',
          payload: error.response.data.message,
        });
      }
    };
  };
}

export default Subscription;
