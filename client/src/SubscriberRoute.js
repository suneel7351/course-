import { Navigate, Outlet } from 'react-router-dom';

function SubscriberRoute({ isEnroll, Children }) {
  if (!isEnroll) return <Navigate to="/enroll" />;
  return Children ? Children : <Outlet />;
}

export default SubscriberRoute;
