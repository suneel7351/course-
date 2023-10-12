import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layouts/Loader';
import { MdDelete, MdFileUpload } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import CourseAction from '../../redux/actions/course';
import toast from 'react-hot-toast';
import AdminAction from '../../redux/actions/admin';
import VideoPlayer from './VideoPlayer';
import { AiOutlineEdit } from 'react-icons/ai';

function Lectures() {
  const params = useParams();
  const dispatch = useDispatch();
  const { lectures, loading, error, message } = useSelector(state => state.course);
  const { loading: Loading, error: adminError, message: adminMessage } = useSelector(
    state => state.admin
  );

  const [lectureTitle, setLectureTitle] = useState('');
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingLectureId, setEditingLectureId] = useState(null);

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
    if (isEditing) {
      try {
      
        const data = new FormData();
        data.append('title', lectureTitle);
        data.append('description', description);
       if(video){
        data.append('file', video);
       }
        await dispatch(AdminAction.updateLecture(editingLectureId, data, params.id));
        toast.success('Lecture updated successfully.');
        setIsEditing(false);
        setEditingLectureId(null);
      } catch (error) {
        toast.error('Error updating lecture.');
        console.error(error);
      }
    } else {
      try {
        if (!video) {
          toast.error('Video is required.');
          return;
        }

        const data = new FormData();
        data.append('title', lectureTitle);
        data.append('description', description);
        data.append('file', video);
        await dispatch(AdminAction.addLecture(data, params.id));
        setVideo(null);
      } catch (error) {
        toast.error('Error adding lecture.');
        console.error(error);
      }
    }

    setVideoPreview('');
    setLectureTitle('');
    setDescription('');
  };

  const editLectureHandler = lecture => {
    setEditingLectureId(lecture._id);
    setLectureTitle(lecture.title);
    setDescription(lecture.description);
    setVideoPreview(lecture.video && lecture.video.url);
    setIsEditing(true);
  };

  const cancelEditHandler = () => {
    setEditingLectureId(null);
    setLectureTitle('');
    setDescription('');
    setVideoPreview('');
    setVideo(null);
    setIsEditing(false);
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
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col-reverse md:flex-row gap-8">
          <div className="py-8 flex flex-col gap-4 pl-4 flex-1">
            {lectures && lectures.length > 0 ? (
              lectures.map((item, index) => {
                return (
                  <div key={item._id} className="shadow p-4 border border-gray-100 bg-white mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h1 className="font-medium text-xl">
                        <span className="mr-1"> #{index + 1}</span>
                        {item.title}
                      </h1>
                      {Loading ? (
                        <button className="btn btn-secondary">
                          <div className="small-spinner"></div>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1 cursor-pointer">
                          <AiOutlineEdit onClick={() => editLectureHandler(item)} />
                          <MdDelete
                            className="text-2xl cursor-pointer "
                            onClick={() => deleteLectureHandler(item._id)}
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <VideoPlayer videoUrl={item.video && item.video.url} />
                  </div>
                );
              })
            ) : (
              <h1 className="text-3xl text-slate-600">No Lecture added yet...</h1>
            )}
          </div>
          <div className="flex-1">
            {videoPreview && (
              <video controls className="shadow-md p-3 w-full" src={videoPreview}></video>
            )}
            <div className="py-8 flex flex-col gap-4 px-4 flex-1 max-h-[80vh] overflow-y-auto">
              <form
                className="flex gap-8 flex-col justify-center shadow p-4 border border-gray-100 bg-white mb-4 px-4 py-8"
                onSubmit={addLectureHandler}
                encType="multipart/form-data"
              >
                <h1 className="text-2xl text-slate-700">
                  {isEditing ? 'Edit Lecture' : 'Add Lecture'}
                </h1>
                <input
                  required
                  placeholder="Lecture Title"
                  value={lectureTitle}
                  onChange={e => setLectureTitle(e.target.value)}
                  type="text"
                  className="rounded text-gray-700 py-1 pl-4 pr-2 shadow border border-gray-100 active:outline-none outline-none focus:outline-none w-full"
                />
                <textarea
                  required
                  placeholder="Lecture Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  type="text"
                  rows={3}
                  className="rounded text-gray-700 py-1 pl-4 pr-2 shadow border border-gray-100 active:outline-none outline-none focus:outline-none w-full"
                ></textarea>

                <label className="rounded text-gray-700 py-1 pl-4 pr-2 shadow border border-gray-100 flex items-center justify-center gap-2 active:outline-none outline-none focus:outline-none w-full cursor-pointer items-center justify-center gap-2">
                  <input
                    accept="video/mp4"
                    onChange={changeVideoHandler}
                    type="file"
                    className="hidden"
                  />
                  Upload Video <MdFileUpload className="text-2xl" />
                </label>

                <div className="flex items-center justify-between">
                  {Loading ? (
                    <button className="btn btn-secondary">
                      <div className="small-spinner"></div>
                    </button>
                  ) : (
                    <button className="w-[35%] btn btn-secondary" type="submit">
                      {isEditing ? 'Update Lecture' : 'Add Lecture'}
                    </button>
                  )}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={cancelEditHandler}
                      className="w-[35%] btn btn-secondary"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Lectures;
