import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseAction from '../../redux/actions/course';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../layouts/Loader';

function CoursePage({ user }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, lectures, error } = useSelector(state => state.course);
  const [lectureNo, setLectureNo] = useState(0);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  }, [dispatch, error]);

  useEffect(() => {
    dispatch(CourseAction.getCourses(id));
  }, [id, dispatch]);

  const currentLectureHandler = (vdUrl, lecDescription, lecTitle, index) => {
    setUrl(vdUrl);
    setDescription(lecDescription);
    setTitle(lecTitle);
    setLectureNo(index);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {lectures && lectures.length > 0 ? (
            <>
              <div className="container px-2 py-8">
                <div className="flex  justify-center flex-col gap-8 md:flex-row">
                  {lectures && lectures.length > 0 && (
                    <div className="flex-1 flex flex-col gap-4">
                      <div className="w-full p-2 shadow-md">
                        {url ? (
                          <video
                            src={url}
                            className="h-[360px]"
                            controls
                            controlsList="nodownload nofullscreen"
                          ></video>
                        ) : (
                          <div className="h-[360px] bg-gray-300 flex items-center justify-center">
                            Video not available
                          </div>
                        )}
                      </div>
                      <h1 className="text-xl text-slate-700">
                        <span className="mr-2">#{lectureNo}</span>
                        {title
                          ? title
                          : lectures &&
                            lectures.length > 0 &&
                            lectures[0].title}
                      </h1>
                      <span className="text-xl">Description: </span>
                      <p>
                        {description
                          ? description
                          : lectures &&
                            lectures.length > 0 &&
                            lectures[0].description}
                      </p>
                    </div>
                  )}
                  <div className="md:overflow-y-auto md:h-[80vh] flex flex-col gap-4 flex-1">
                    {lectures &&
                      lectures.length > 0 &&
                      lectures.map((item, index) => {
                        return (
                          <div
                            onClick={() =>
                              currentLectureHandler(
                                item.video && item.video.url,
                                item.description,
                                item.title,
                                index + 1
                              )
                            }
                            key={item._id}
                            className="px-6 py-4 rounded border border-gray-100 bg-white shadow cursor-pointer"
                          >
                            #{index + 1} <span className="mr-1"></span>
                            {item.title}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-3xl text-slate-700 flex items-center justify-center h-[70vh]">
              No lecture found.
            </div>
          )}
        </>
      )}
    </>
  );
}

export default CoursePage;
