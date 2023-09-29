import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { MdFileUpload } from 'react-icons/md';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import User from '../../redux/actions/user';
function Register({ isLogged }) {
  const { error, message, loading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [imgPreview, setImagePreview] = useState('');
  const [image, setImage] = useState('');

  //   UnderStand it
  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = e => {
    e.preventDefault();
    if (image === '') {
      toast.error('Select Profile Photo');
      return;
    }
    const data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    data.append('file', image);
    dispatch(User.register(data));
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
  }, [error, message, dispatch]);
  if (isLogged) {
    return <Navigate to={'/profile'} />;
  }
  return (
    <div className="container mx-auto pt-2">
      <div className="flex justify-center mb-8">
        {imgPreview && (
          <img
            className="w-24 h-24 rounded-full"
            src={imgPreview}
            alt="profile"
          />
        )}
      </div>
      <form
        className="flex gap-8  flex-col justify-center w-[90%] md:w-[60%] lg:w-[35%] mx-auto shadow-md px-6 py-8"
        onSubmit={submitHandler}
        encType="multipart/form-data"
      >
        <h1 className="text-2xl text-slate-700">Register</h1>
        <input
          required
          placeholder="abc"
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          className=" rounded-md text-slate-700 py-1 pl-4 pr-2 shadow-md active:outline-none outline-none focus:outline-none w-full"
        />
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
        <label className="flex rounded-md text-slate-700 py-1 pl-4 pr-2 shadow-md active:outline-none outline-none focus:outline-none w-full cursor-pointer items-center justify-center gap-2">
          <input
            accept="image/*"
            onChange={changeImageHandler}
            type="file"
            className=" hidden "
          />{' '}
          Profile Upload <MdFileUpload className="text-2xl" />
        </label>
        <div className="flex items-center justify-between">
          {loading ? (
            <button className="btn btn-secondary">
              <div className="small-spinner"></div>
            </button>
          ) : (
            <button className="w-[10%] btn btn-secondary" type="submit">
              Register
            </button>
          )}

          <Link
            to="/login"
            className="underline decoration-solid duration-500 hover:text-slate-600"
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
