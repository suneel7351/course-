import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import User from '../../redux/actions/user';
function CourseCard({
  _id,
  poster,
  title,
  description,
  category,
  CreatedAt,
  createdBy,

  loading,
}) {
  const dispatch = useDispatch();
  const addToPlayList = async _id => {
    await dispatch(User.addToPlaylist(_id));
    dispatch(User.getUser());
  };
  return (
    <div className="shadow-md p-2 pb-4 w-[280px] md:w-[310px] mx-auto">
      <img src={poster && poster.url} alt={title} className="mb-2" />
      <span className="bg-[#6c6c6c]  text-slate-100 px-2 py-1 rounded-full">
        {category}
      </span>
      <h1 className="text-bold text-xl text-slate-800 mb-2">{title}</h1>
      <p className=" text-slate-700">{description}</p>
      <div className="mt-2">
        <span>CreatedAt : </span>
        <span className="text-slate-600">{CreatedAt.split('T')[0]}</span>
      </div>{' '}
      <div>
        <span>CreatedBy : </span>
        <span className="text-slate-600">{createdBy.split('T')[0]}</span>
      </div>
      <div className="flex justify-between mb-2 mt-4">
        {loading ? (
          <button className="btn btn-primary">
            <div className="small-spinner"></div>
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => addToPlayList(_id)}
          >
            Add to Playlist
          </button>
        )}

        <Link to={`/course/${_id}`} className="btn btn-secondary">
          Watch Now
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
