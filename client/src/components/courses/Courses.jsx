import './style.css';
import React, { useState, useEffect } from 'react';

import CourseAction from '../../redux/actions/course';
import { useDispatch, useSelector } from 'react-redux';
import CourseCard from './CourseCard';
import toast from 'react-hot-toast';
import Loader from '../layouts/Loader';
const Courses = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');
  const Category = [
    'JavaScript',
    'Reactjs',
    'Full Stack',
    'Nodejs',
    'React Native',
  ];
  const { courses, error, loading } = useSelector(state => state.course);
  const {
    error: userError,
    loading: userLoading,
    message,
  } = useSelector(state => state.user);
  const searchHandler = () => {
    dispatch(CourseAction.getAllCourses(keyword, ''));
  };
  const categoryHandler = item => {
    setCategory(item);
    dispatch(CourseAction.getAllCourses('', category));
  };


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (userError) {
      toast.error(userError);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    dispatch(CourseAction.getAllCourses('', ''));
  }, [dispatch, error, userError, message]);
  return (
    <>
      <div className="mt-12 py-4">
        <h1 className="text-3xl text-center text-bold">Latest Courses</h1>
        <div className="w-[80%] mx-auto mt-4">
          {' '}
          <div className="px-2 py-1 flex border-2 border-solid border-slate-600 active:border-[#eebf00] hover:border-[#eebf00] ease-in-out duration-500  rounded-md">
            {' '}
            <input
              name="keyword"
              type="text"
              onChange={e => setKeyword(e.target.value)}
              placeholder="Search the courses"
              className="text-slate-700 pl-4 active:outline-none outline-none focus:outline-none w-full"
            />{' '}
            <button onClick={searchHandler} className="btn btn-primary">
              Search
            </button>
          </div>
          <div className="flex gap-2 flex-wrap items-center mt-6 justify-center">
            {Category.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={() => categoryHandler(item)}
                  className="btn btn-secondary"
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap justify-evenly  py-8 ">
            {courses && courses.length > 0 ? (
              courses.map(item => {
                return (
                  <CourseCard
                    _id={item._id}
                    key={item._id}
                    poster={item.poster}
                    title={item.title}
                    description={item.description}
                    category={item.category}
                    CreatedAt={item.CreatedAt}
                    createdBy={item.createdBy}
                    loading={userLoading}
                  />
                );
              })
            ) : (
              <h1 className="text-3xl text-slate-700 ">No Courses found.</h1>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Courses;
