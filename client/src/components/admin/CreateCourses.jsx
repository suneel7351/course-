import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import AdminAction from '../../redux/actions/admin';
import toast from 'react-hot-toast';
import { MdFileUpload } from 'react-icons/md';
function CreateCourses() {
  const dispatch = useDispatch();
  const { error, message, loading } = useSelector(state => state.admin);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [img, setImg] = useState('');
  const [imgPreview, setImgPreview] = useState('');
  const categories = [
    'web dev',
    'app dev',
    'data structure',
    'machine learning',
    'blockchain',
  ];

  //   UnderStand it
  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgPreview(reader.result);
      setImg(file);
    };
  };

  const submitHandler = async e => {
    e.preventDefault();
    if (img === '' || img === undefined) {
      toast.error('Poster is required.');
      return;
    }
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('category', category);
    data.append('createdBy', createdBy);
    data.append('file', img);

    await dispatch(AdminAction.createCourse(data));
    setTitle('');
    setCategory('');
    setImg('');
    setCreatedBy('');
    setDescription('');
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
  return (
    <>
      <div className="container mx-auto pt-2">
        <div className="flex justify-center mb-8">
          {imgPreview && (
            <img
              className="w-60 h-48 rounded-md"
              src={imgPreview}
              alt="profile"
            />
          )}
        </div>
        <form
          className="flex gap-8  flex-col justify-center w-[94%] md:w-[70%] lg:w-[45%] mx-auto shadow-md px-6 py-8"
          onSubmit={submitHandler}
          encType="multipart/form-data"
        >
          <h1 className="text-2xl text-slate-700">Register</h1>
          <input
            required
            placeholder="Course Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text"
            className=" rounded-md text-slate-700 py-1 pl-4 pr-2 shadow-md active:outline-none outline-none focus:outline-none w-full"
          />
          <textarea
            required
            placeholder="Course Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            type="text"
            className=" rounded-md text-slate-700 py-1 pl-4 pr-2 shadow-md active:outline-none outline-none focus:outline-none w-full"
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="rounded-md bg-white text-slate-700 py-2 cursor-pointer pl-4 pr-2 shadow-md active:outline-none outline-none focus:outline-none w-full"
          >
            <option value="">Category</option>
            {categories.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>{' '}
          <div className="rounded-md text-slate-700 py-1 px-4  shadow-md  w-full flex items-center justify-between cursor-pointer">
            <input
              required
              placeholder="Created By"
              value={createdBy}
              onChange={e => setCreatedBy(e.target.value)}
              type="text"
              className="active:outline-none outline-none focus:outline-none flex-[95%]"
            />
          </div>{' '}
          <label className="flex rounded-md text-slate-700 py-1 pl-4 pr-2 shadow-md active:outline-none outline-none focus:outline-none w-full cursor-pointer items-center justify-center gap-2">
            <input
              accept="image/*"
              onChange={changeImageHandler}
              type="file"
              className=" hidden "
            />{' '}
            Upload Poster <MdFileUpload className="text-2xl" />
          </label>
          <div className="flex items-center justify-between">
            {loading ? (
              <button className="btn btn-secondary">
                <div className="small-spinner"></div>
              </button>
            ) : (
              <button className="w-[25%] btn btn-secondary" type="submit">
                Create Course
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateCourses;
