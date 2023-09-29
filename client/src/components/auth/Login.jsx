import { FiEye, FiEyeOff } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import User from '../../redux/actions/user';
import toast from 'react-hot-toast';
function Login({ isLogged }) {
  const { loading, error, message } = useSelector(state => state.user);
 
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginHandler = e => {
    e.preventDefault();
    dispatch(User.login(email, password));
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

  if (isLogged) {
    return <Navigate to={'/profile'} />;
  }
  return (
    <div className="container mx-auto pt-12 md:pt-24">
      <form
        className="flex gap-8  flex-col justify-center w-[90%] md:w-[60%] lg:w-[35%] mx-auto shadow-md px-6 py-8"
        onSubmit={loginHandler}
      >
        <h1 className="text-2xl text-slate-700">Login</h1>
        <input
          required
          placeholder="xyz@gmail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          className=" rounded-md text-slate-700 py-1 pl-4 pr-2 shadow-md active:outline-none outline-none focus:outline-none w-full"
        />
        <div className="rounded-md text-slate-700 py-1 px-4  shadow-md  w-full flex items-center justify-between cursor-pointer">
          <input
            required
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            className="active:outline-none outline-none focus:outline-none flex-[95%]"
          />
          <span onClick={handleTogglePassword}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>{' '}
        <div className="flex items-center justify-between">
          {loading ? (
            <button className="btn btn-secondary">
              <div className="small-spinner"></div>
            </button>
          ) : (
            <button className="w-[10%] btn btn-secondary" type="submit">
              Login
            </button>
          )}

          <Link
            to="/register"
            className="underline decoration-solid duration-500 hover:text-slate-600"
          >
            Not have an account?
          </Link>
        </div>
        <Link
          to="/forgetpassword"
          className="underline decoration-solid duration-500 hover:text-slate-600"
        >
          Forget Password?
        </Link>
      </form>
    </div>
  );
}

export default Login;
