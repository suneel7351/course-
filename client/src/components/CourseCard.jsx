import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import User from '../redux/actions/user'

const CourseCard = ({ _id, title, description, poster, category, createdAt, createdBy, loading }) => {
const dispatch=useDispatch()
  const addToPlayList = async _id => {
    await dispatch(User.addToPlaylist(_id));
    dispatch(User.getUser());
  };
  return (
    <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden rounded-md transform hover:scale-105 transition-transform duration-300 ease-in-out md:w-[400px] w-[275px]">
      <div className="relative overflow-hidden">
        <img className="w-full h-56 object-cover" src={poster?.url} alt={title} />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
        </div>
      </div>
      <div className="p-4">
        <span className="text-gray-50 bg-gray-800 rounded-xl px-4 py-1">{category}</span>
        <h2 className="text-lg font-semibold text-black font-bold">{title}</h2>
        <p className="text-gray-600 mb-2">{description?.length > 95 ? description?.substring(0, 95) : description}...</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-500">Price:</span>
          <span className="text-green-500 font-semibold">{"price"}</span>
        </div>
        <div className='flex gap-4 items-center justify-between'>
          <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-1">
            <span className="text-gray-500">Created At</span>
            <span className="text-gray-700">{new Date(createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-1">
            <span className="text-gray-500">Created By</span>
            <span className="text-gray-700">{createdBy}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <button onClick={()=>addToPlayList(_id)} className="btn btn-primary">
            Add To Playlist
          </button>
          <Link to={`/course/${_id}`} className="btn btn-secondary">
            Watch Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
