import React, { useEffect, useState } from 'react';

import './home.css';
import { Link } from 'react-router-dom';
import vg from '../assets/imgs/home.jpg';
import CourseCard from './CourseCard';
import Hero from './layouts/Hero';
import Typewriter from './layouts/Typewriter';
import { useSelector, useDispatch } from 'react-redux';
import CourseAction from '../redux/actions/course';

function Home() {


  const dispatch = useDispatch();


  const { courses } = useSelector(state => state.course);


  useEffect(() => {
    dispatch(CourseAction.getAllCourses('', ""));
  }, [dispatch])



  return (
    <section className=" h-full container mx-auto">
      <div className="flex flex-col md:flex-row  justify-center gap-8">
        <div className="md:flex-1 flex item-center flex-col gap-2 md:pr-4 md:pl-8 md:pt-16 pt-2 px-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            Welcome to <span className="">CodeWithCoder</span>{' '}
          </h1>
          <div className='flex items-center gap-2'> <h2 className="text-2xl font-bold">Learn</h2>
            <Typewriter texts={["Machine Learning", "Artificial Intelligence", "Data Structure", "Web Dev"]} /></div>
          <p className="text-slate-700">
            Confused on which course to take? I have got you covered. Browse
            courses and find out the best course for you. Its free! Code With
            Harry is my attempt to teach basics and those coding techniques to
            people in short time which took me ages to learn.
          </p>
          <div className="flex gap-4">
            <Link to="/courses" className="btn btn-primary">
              Explore Courses
            </Link>
            <button className="btn btn-secondary">Explore Blog</button>
          </div>
        </div>
        <div className="flex-1 home-img">
          <img src={vg} alt="" />
        </div>
      </div>


      <Hero />


      <div className="container mx-auto p-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses && courses.length > 0 && courses.map((item) => {
            return <CourseCard
              _id={item._id}
              key={item._id}
              poster={item.poster}
              title={item.title}
              description={item.description}
              category={item.category}
              CreatedAt={item.CreatedAt}
              createdBy={item.createdBy}
            />
          })}
        </div>
      </div>


    </section>
  );
}

export default Home;




