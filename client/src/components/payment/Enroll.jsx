
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { url } from '../../redux/store';
import Subscription from '../../redux/actions/subscription';
import toast from 'react-hot-toast';

function Enroll({ user }) {
  const [key, setKey] = useState('');
  const dispatch = useDispatch();
  const { subscriptionId, error, loading } = useSelector(state => state.enroll);

  const enrollHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`${url}/api/v3/getkeyid`);
    setKey(key);

    dispatch(Subscription.enrollCourse());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      const popUp = () => {
        const options = {
          key, // Enter the Key ID generated from the Dashboard
          // amount: '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          // currency: 'INR',
          name: 'Acme Corp', //your business name
          description: 'Test Transaction',
          image: 'https://example.com/your_logo',
          subscription_id: subscriptionId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url: `${url}/api/v3/verify`,
          prefill: {
            name: user && user.name, //your customer's name
            email: user && user.email,
          },
          notes: {
            address: 'Razorpay Corporate Office',
          },
          theme: {
            color: '#3399cc',
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      };
      popUp();
    }
  }, [error, dispatch, key, subscriptionId, user]);
  return (
    <div className="h-full py-8">
      <h1 className="text-5xl mb-8 text-center text-slate-700">Welcome</h1>
      <div className="shadow-md  w-[280px] md:w-[30%] mx-auto">
        <div>
          <h1 className="bg-slate-700 text-slate-100 py-2 pl-4 rounded-t-md text-xl">
            Pro Pack - $9
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="px-8 py-2">
            <p className="text-center w-[60] text-lg">
              Join Pro pack and get access to all content.
            </p>
            <h1 className="text-center my-1 text-xl font-bold">$9 only</h1>
          </div>

          {loading ? (
            <button className="btn btn-secondary">
              <div className="small-spinner"></div>
            </button>
          ) : (
            <button className="btn btn-primary" onClick={enrollHandler}>
              Buy Now
            </button>
          )}
        </div>{' '}
        <div className="bg-slate-700 text-slate-100 rounded-b-md mt-6 py-1 pl-4">
          <h1>100% refund at cacellation</h1>
          <p>*Term & Conditions Apply</p>
        </div>
      </div>
    </div>
  );
}

export default Enroll;
