import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layouts/Loader';
import { MdDelete, MdFileUpload } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import CourseAction from '../../redux/actions/course';
import toast from 'react-hot-toast';
import AdminAction from '../../redux/actions/admin';
import { Link } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
function Lectures() {
  const params = useParams();
  const dispatch = useDispatch();
  const { lectures, loading, error, message } = useSelector(
    state => state.course
  );
  const {
    loading: Loading,
    error: adminError,
    message: adminMessage,
  } = useSelector(state => state.admin);


  const [lectureTitle, setLectureTitle] = useState();
  const [video, setVideo] = useState();
  const [videoPreview, setVideoPreview] = useState();
  const [description, setDescription] = useState();
  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPreview(reader.result);
      setVideo(file);
    };
  };
  const addLectureHandler = async e => {
    e.preventDefault();
    if (video === '' || video === undefined) {
      toast.error('Video is required.');
      return;
    }
    const data = new FormData();
    data.append('title', lectureTitle);
    data.append('description', description);
    data.append('file', video);
    await dispatch(AdminAction.addLecture(data, params.id));
    setVideoPreview('');
    setLectureTitle('');
    setDescription('');
  };

  const deleteLectureHandler = id => {
    dispatch(AdminAction.deleteLecture(id, params.id));
  };
  useEffect(() => {
    dispatch(CourseAction.getCourses(params.id));
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (adminError) {
      toast.error(adminError);
      dispatch({ type: 'clearError' });
    }
    if (adminMessage) {
      toast.success(adminMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message, params.id, adminError, adminMessage]);
  return (
    <>
      {' '}
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="py-8 flex flex-col gap-4 pl-4 flex-1">
            
            {/* <span className="text-slate-700">#{id}</span>{' '} */}
            <Link className="btn btn-secondary w-[50px]" to="/admin/courses">
              Back
            </Link>
            {lectures && lectures.length > 0 ? (
              lectures.map((item, index) => {
                return (
                  <div key={item._id} className="shadow-md p-4 rounded-md">
                    <div className="flex items-center justify-between">
                      <h1 className="font-medium text-xl">
                        <span className="mr-1"> #{index + 1}</span>
                        {item.title}
                      </h1>{' '}
                      {Loading ? (
                        <button className="btn btn-secondary">
                          <div className="small-spinner"></div>
                        </button>
                      ) : (
                        <MdDelete
                          className="text-2xl cursor-pointer "
                          onClick={() => deleteLectureHandler(item._id)}
                        />
                      )}
                    </div>
                    <p>{item.description}</p>
                    <VideoPlayer videoUrl={item.video && item.video.url} />
                  </div>
                );
              })
            ) : (
              <h1 className="text-3xl text-slate-600">
                No Lecture added yet...
              </h1>
            )}
          </div>
          <div className="flex-1">
            {' '}
            {videoPreview && (
              <video
                controls
                className="shadow-md p-3"
                src={videoPreview}
              ></video>
            )}
            <div className="py-8 flex flex-col gap-4 px-4 flex-1">
              <form
                className="flex gap-8  flex-col justify-center  shadow-md px-4 py-8"
                onSubmit={addLectureHandler}
                encType="multipart/form-data"
              >
                <h1 className="text-2xl text-slate-700">Add Lecture</h1>
                <input
                  required
                  placeholder="Course Title"
                  value={lectureTitle}
                  onChange={e => setLectureTitle(e.target.value)}
                  type="text"
                  className=" rounded-md text-slate-700 py-1 pl-4 pr-2 shadow-md active:outline-none outline-none focus:outline-none w-full"
                />
                <input
                  required
                  placeholder="Course Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  type="text"
                  className=" rounded-md text-slate-700 py-1 pl-4 pr-2 shadow-md active:outline-none outline-none focus:outline-none w-full"
                />

                <label className="flex rounded-md text-slate-700 py-1 pl-4 pr-2 shadow-md active:outline-none outline-none focus:outline-none w-full cursor-pointer items-center justify-center gap-2">
                  <input
                    accept="video/mp4"
                    onChange={changeVideoHandler}
                    type="file"
                    className=" hidden "
                  />{' '}
                  Upload Video <MdFileUpload className="text-2xl" />
                </label>
                <div className="flex items-center justify-between">
                  {Loading ? (
                    <button className="btn btn-secondary">
                      <div className="small-spinner"></div>
                    </button>
                  ) : (
                    <button
                      className="w-[35%]  btn btn-secondary"
                      type="submit"
                    >
                      Add Lecture
                    </button>
                  )}
                </div>
              </form>
            </div>{' '}
          </div>

          {/* <button className="btn btn-secondary" onClick={onCloseModal}>
        Close
      </button> */}
        </div>
      )}
    </>
  );
}

export default Lectures;
