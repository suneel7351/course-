import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import Other from '../../redux/actions/other';
function ForgetPassword() {
  const dispatch = useDispatch();
  const { message, error, loading } = useSelector(state => state.other);
  const [email, setEmail] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    dispatch(Other.forgetPassword(email));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);
  return (
    <div className="container mx-auto ">
      <div className="h-[65vh] flex items-center justify-center flex-col gap-8 shadow-md py-4">
        <h1 className="text-2xl text-center">Forget Password</h1>{' '}
        <form
          className="w-[90%] md:w-[50%] lg:w-[35%] mx-auto flex flex-col gap-4"
          onSubmit={submitHandler}
        >
          <input
            required
            placeholder="xyz@gmail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            className=" rounded-md text-slate-700 py-2 pl-4 pr-2 shadow-md active:outline-none outline-none focus:outline-none w-full"
          />
          {loading ? (
            <button className="btn btn-secondary">
              <div className="small-spinner"></div>
            </button>
          ) : (
            <button type="submit" className="btn btn-secondary">
              Forget Password
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
