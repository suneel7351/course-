import React, { useEffect, useState } from 'react';
import Loader from '../layouts/Loader';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Subscription from '../../redux/actions/subscription';
import User from '../../redux/actions/user';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Modal, ModalContent, useDisclosure } from '@chakra-ui/react';
import { MdFileUpload, MdDelete } from 'react-icons/md';
function Profile() {
  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { onClose, isOpen, onOpen } = useDisclosure();
  const [imgPreview, setImagePreview] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState(name);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const dispatch = useDispatch();
  const {
    error,
    message,
    loading: Loading,
  } = useSelector(state => state.enroll);
  const {
    user,
    loading,
    error: userError,
    message: userMessage,
  } = useSelector(state => state.user);

  const onOpenModal1 = () => setIsOpenModal1(true);
  const onCloseModal1 = () => setIsOpenModal1(false);

  const onOpenModal2 = () => setIsOpenModal2(true);
  const onCloseModal2 = () => setIsOpenModal2(false);
  const handleTogglePassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handleTogglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const updatePasswordHandler = async e => {
    e.preventDefault();
    await dispatch(User.updatePassword(oldPassword, newPassword));
    setOldPassword('');
    setNewPassword('');
    onCloseModal1();
  };
  const cancelSubscriptionHandler = async () => {
    await dispatch(Subscription.cancelSubscription());
    dispatch(User.getUser());
  };

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file);
    };
  };

  const changeAvatar = async e => {
    e.preventDefault();
    if (imgPreview === '') {
      toast.error('Choose a profile.');
      return;
    }
    const pic = new FormData();
    pic.append('file', image);
    await dispatch(User.updateProfilePic(pic));
    setImage('');
    setImagePreview('');
    dispatch(User.getUser());
    onClose();
  };

  const updateProfileHandler = async e => {
    e.preventDefault();
    await dispatch(User.updateProfile(name, email));
    setName('');
    setEmail('');
    onCloseModal2();
    dispatch(User.getUser());
  };
  const onCloseHandler = () => {
    onClose();
    setImage('');
    setImagePreview('');
  };

  const removeFromPlaylistHandler = async id => {
    await dispatch(User.removeFromPlaylist(id));
    dispatch(User.getUser());
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
    if (userMessage) {
      toast.success(userMessage);
      dispatch({ type: 'clearMessage' });
    }
    if (userError) {
      toast.error(userError);
      dispatch({ type: 'clearError' });
    }
  }, [dispatch, error, message, userError, userMessage]);

  return (
    <div className="mt-4 container mx-auto">
      <h1 className="text-2xl p-4 shadow-sm text-bold text-slate-700 text-center">
        User Profile
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          {' '}
          {user && (
            <>
              <div className="flex flex-col md:flex-row gap-16 mt-4 justify-center ">
                <div className=" p-4 flex items-center justify-center flex-col gap-3">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user.name}
                    className="w-32 h-32 rounded-full"
                  />
                  <span className="text-xl font-medium">{user.name}</span>
                  <button className="btn btn-primary" onClick={onOpen}>
                    Change Photo
                  </button>
                  <Modal isOpen={isOpen} onClose={onCloseHandler} size="">
                    <ModalContent>
                      <div className="pt-24 flex items-center justify-center h-screen">
                        {' '}
                        {imgPreview && (
                          <img
                            className="w-32 h-32  rounded-full"
                            src={imgPreview}
                            alt="profile"
                          />
                        )}
                      </div>
                      <form
                        onSubmit={changeAvatar}
                        className="flex flex-col gap-8 mt-12 h-screen px-4 w-[270px] md:w-[340px] mx-auto"
                      >
                        {' '}
                        <label className=" flex rounded-md text-slate-700 py-1 pl-4 pr-2 shadow-md active:outline-none outline-none focus:outline-none w-full cursor-pointer items-center justify-center gap-2">
                          <input
                            accept="image/*"
                            onChange={changeImageHandler}
                            type="file"
                            className=" hidden "
                          />{' '}
                          Profile Upload <MdFileUpload className="text-2xl" />
                        </label>
                        <div className="flex items-center justify-between">
                          <button className=" btn btn-secondary" type="submit">
                            Change Avatar
                          </button>

                          <span
                            className="btn btn-secondary"
                            onClick={onCloseHandler}
                          >
                            Close
                          </span>
                        </div>
                      </form>
                    </ModalContent>
                  </Modal>
                  {user && user.role && user.role !== 'admin' && (
                    <div>
                      {user &&
                      user.subscription &&
                      user.subscription.status === 'active' ? (
                        <>
                          {' '}
                          {Loading ? (
                            <button className="btn btn-secondary">
                              <div className="small-spinner"></div>
                            </button>
                          ) : (
                            <button
                              className="btn btn-secondary"
                              onClick={cancelSubscriptionHandler}
                            >
                              Cancel Subscription
                            </button>
                          )}
                        </>
                      ) : (
                        <Link to="/enroll" className="btn btn-primary">
                          Enroll Now
                        </Link>
                      )}
                    </div>
                  )}
                </div>
                <div className=" p-4">
                  <div className="flex  ga-8 md:gap-32 text-lg p-4">
                    <span className="w-48">Full Name</span>
                    <span className="text-slate-700 ">{user.name}</span>
                  </div>{' '}
                  <div className="flex ga-8 md:gap-32  text-lg border-y-2 p-4 border-solid border-slate-300">
                    <span className="w-48">Email</span>
                    <span className="text-slate-700 ">{user.email}</span>
                  </div>{' '}
                  <div className="flex ga-8 md:gap-32  text-lg p-4">
                    <span className="w-48">RegisteredAt</span>
                    <span className="text-slate-700 ">
                      {user.createdAt.split('T')[0]}
                    </span>
                  </div>
                  <div className="flex gap-6 mt-6">
                    <button className="btn btn-primary" onClick={onOpenModal1}>
                      Update password
                    </button>
                    <Modal
                      isOpen={isOpenModal1}
                      onClose={onCloseModal1}
                      size="full"
                    >
                      <ModalContent>
                        <div className="pt-24 flex items-center justify-center h-full">
                          {' '}
                          {imgPreview && (
                            <img
                              className="w-32 h-32  rounded-full"
                              src={imgPreview}
                              alt="profile"
                            />
                          )}
                        </div>
                        <form
                          onSubmit={updatePasswordHandler}
                          className="flex flex-col gap-8 mt-12 h-screen px-4 w-[270px] md:w-[310px] mx-auto"
                        >
                          {' '}
                          <div className="rounded-md text-slate-700 py-1 px-4  shadow-md  w-full flex items-center justify-between cursor-pointer">
                            <input
                              required
                              placeholder="Enter Old Password"
                              value={oldPassword}
                              onChange={e => setOldPassword(e.target.value)}
                              type={showPassword2 ? 'text' : 'password'}
                              className="active:outline-none outline-none focus:outline-none flex-[95%]"
                            />
                            <span onClick={handleTogglePassword2}>
                              {showPassword2 ? <FiEyeOff /> : <FiEye />}
                            </span>
                          </div>{' '}
                          <div className="rounded-md text-slate-700 py-1 px-4  shadow-md  w-full flex items-center justify-between cursor-pointer">
                            <input
                              required
                              placeholder="Enter New Password"
                              value={newPassword}
                              onChange={e => setNewPassword(e.target.value)}
                              type={showPassword1 ? 'text' : 'password'}
                              className="active:outline-none outline-none focus:outline-none flex-[95%]"
                            />
                            <span onClick={handleTogglePassword1}>
                              {showPassword1 ? <FiEyeOff /> : <FiEye />}
                            </span>
                          </div>{' '}
                          <div className="flex items-center justify-between">
                            <button
                              className=" btn btn-secondary"
                              type="submit"
                            >
                              Change Password
                            </button>

                            <span
                              className="btn btn-secondary"
                              onClick={onCloseModal1}
                            >
                              Close
                            </span>
                          </div>
                        </form>
                      </ModalContent>
                    </Modal>
                    <button
                      className="btn btn-secondary"
                      onClick={onOpenModal2}
                    >
                      Update Profile
                    </button>{' '}
                    <Modal
                      isOpen={isOpenModal2}
                      onClose={onCloseModal2}
                      size="full"
                    >
                      <ModalContent>
                        <form
                          onSubmit={updateProfileHandler}
                          className="pt-24 flex flex-col gap-8 mt-12 h-screen px-4 w-[270px] md:w-[310px] mx-auto"
                        >
                          {' '}
                          <div className="rounded-md text-slate-700 py-1 px-4  shadow-md  w-full flex items-center justify-between cursor-pointer">
                            <input
                              placeholder="Enter Name"
                              value={name}
                              onChange={e => setName(e.target.value)}
                              type="text"
                              className="active:outline-none outline-none focus:outline-none flex-[95%]"
                            />
                          </div>{' '}
                          <div className="rounded-md text-slate-700 py-1 px-4  shadow-md  w-full flex items-center justify-between cursor-pointer">
                            <input
                              placeholder="Enter Email"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              type="email"
                              className="active:outline-none outline-none focus:outline-none flex-[95%]"
                            />
                          </div>{' '}
                          <div className="flex items-center justify-between">
                            <button
                              className=" btn btn-secondary"
                              type="submit"
                            >
                              Update Profile
                            </button>

                            <span
                              className="btn btn-secondary"
                              onClick={onCloseModal2}
                            >
                              Close
                            </span>
                          </div>
                        </form>
                      </ModalContent>
                    </Modal>{' '}
                  </div>
                </div>
              </div>
              <div className="mt-8 container">
                <h1 className="text-center shadow-sm p-4 text-3xl">Playlist</h1>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  {user.playlist &&
                    user.playlist.length > 0 &&
                    user.playlist.map(item => {
                      return (
                        <div
                          key={item.course}
                          className="w-[70%] flex-col md:w-[20%] shadow-md p-2"
                        >
                          <img src={item.poster} alt={item._id} />{' '}
                          <div className="flex items-center justify-between px-2 py-4">
                            {' '}
                            <Link
                              to={`/course/${item.course}`}
                              className="btn btn-secondary"
                            >
                              watch
                            </Link>
                            <button
                              onClick={() =>
                                removeFromPlaylistHandler(item.course)
                              }
                            >
                              <MdDelete className="text-2xl" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Profile;
