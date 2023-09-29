import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute({ isAdmin, Children }) {
  if (!isAdmin) return <Navigate to="/profile" />;
  return Children ? Children : <Outlet />;
}

export default AdminRoute;
