import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminAction from '../../redux/actions/admin';
import { MdDelete } from 'react-icons/md';
import Loader from '../layouts/Loader';
import toast from 'react-hot-toast';
function Courses() {


  const { courses, loading, message, error } = useSelector(
    state => state.admin
  );
  const dispatch = useDispatch();

  const deleteCourseHandler = async id => {
    await dispatch(AdminAction.deleteCourse(id));
    dispatch(AdminAction.getAllCourses());
  };

  useEffect(() => {
    dispatch(AdminAction.getAllCourses());
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  }, [dispatch, error, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {' '}
          <div className=" overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                  >
                    #CourseId
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Poster
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Creator
                  </th>{' '}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>{' '}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Views
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Lectures
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses &&
                  courses.length > 0 &&
                  courses.map(item => {
                    return (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            className="w-24"
                            src={item.poster && item.poster.url}
                            alt={item.url}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.createdBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {item.category}
                        </td>{' '}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {item.views}
                        </td>{' '}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {item.lectures && item.lectures.length}
                        </td>{' '}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex gap-2 items-center">
                            <Link
                              to={`/admin/course/${item._id}`}
                              className="btn btn-secondary"
                            >
                              View Lectures
                            </Link>
                            {loading ? (
                              <button className="btn btn-secondary">
                                <div className="small-spinner"></div>
                              </button>
                            ) : (
                              <MdDelete
                                className="text-2xl cursor-pointer"
                                onClick={() => deleteCourseHandler(item._id)}
                              />
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default Courses;
