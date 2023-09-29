import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AdminAction from '../../redux/actions/admin';
import { MdDelete } from 'react-icons/md';
import Loader from '../layouts/Loader';
import toast from 'react-hot-toast';
function Users() {
  const { users, loading, message, error } = useSelector(state => state.admin);
  const dispatch = useDispatch();
  // const changeRoleHandler = id => {
  //   dispatch(AdminAction.changeUserRole(id));
  // };
  const deleteUserHandler = id => {
    dispatch(AdminAction.deleteUser(id));
  };
  useEffect(() => {
    dispatch(AdminAction.getAllUsers());
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
                    #UserId
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>{' '}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Subscription
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
                {users &&
                  users.length > 0 &&
                  users.map(item => {
                    return (
                      <tr key={item._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {item.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {item.subscription && item.subscription.status}
                          </span>
                        </td>{' '}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex gap-2 items-center">
                            {/* <button
                              className="btn btn-secondary"
                              onClick={() => changeRoleHandler(item._id)}
                            >
                              Change Role
                            </button> */}
                            <MdDelete
                              className="text-2xl cursor-pointer"
                              onClick={() => deleteUserHandler(item._id)}
                            />
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

export default Users;
