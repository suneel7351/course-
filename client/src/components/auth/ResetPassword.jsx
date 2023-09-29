import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Other from '../../redux/actions/other';
import { FiEye, FiEyeOff } from 'react-icons/fi';
function ResetPassword() {
  const dispatch = useDispatch();
  const { message, error, loading } = useSelector(state => state.other);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const params = useParams();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(Other.resetPassword(password, params.token));
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
        <h1 className="text-2xl text-center">Reset Password</h1>{' '}
        <form
          className="w-[90%] md:w-[50%] lg:w-[35%] mx-auto flex flex-col gap-4"
          onSubmit={submitHandler}
        >
          {' '}
          <div className="rounded-md text-slate-700 py-1 px-4  shadow-md  w-full flex items-center justify-between cursor-pointer">
            <input
              required
              placeholder="New Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              className="active:outline-none outline-none focus:outline-none flex-[95%]"
            />
            <span onClick={handleTogglePassword}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>{' '}
          {loading ? (
            <button className="btn btn-secondary">
              <div className="small-spinner"></div>
            </button>
          ) : (
            <button type="submit" className="btn btn-secondary">
              Reset Password
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
