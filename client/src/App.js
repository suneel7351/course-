import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Courses from './components/courses/Courses';
import Home from './components/Home';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgetPassword from './components/auth/ForgetPassword';
import ResetPassword from './components/auth/ResetPassword';
import Enroll from './components/payment/Enroll';
import PaymentSuccess from './components/payment/PaymentSuccess';
import Notfound from './components/layouts/Notfound';
import PaymentFail from './components/payment/PaymentFail';
import CoursePage from './components/courses/CoursePage';
import Profile from './components/profile/Profile';

import CreateCourses from './components/admin/CreateCourses';
import Users from './components/admin/Users';
import AdminCourses from './components/admin/AdminCourses';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import User from './redux/actions/user';
import { ProtectedRoute } from 'protected-route-react';
import CourseAction from './redux/actions/course';
import Lectures from './components/admin/Lectures';
import AdminRoute from './AdminRoute';
import SubscriberRoute from './SubscriberRoute';
import Work from './components/Work';

function App() {
  // window.addEventListener('contextmenu', e => {
  //   e.preventDefault();
  // });

  const { error, message, isLogged, user } = useSelector(state => state.user);
  const { courses } = useSelector(state => state.course);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  }, [dispatch, message, error, isLogged, user]);
  useEffect(() => {
    dispatch(User.getUser());
    dispatch(CourseAction.getAllCourses());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {' '}
      <Header user={user} isLogged={isLogged} />
      <div className="mt-24 container mx-auto">
        {' '}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses courses={courses} />} />{' '}
          <Route element={<ProtectedRoute isAuthenticated={isLogged} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/enroll" element={<Enroll user={user} />} />{' '}
          </Route>
          <Route
            path="/course/:id"
            element={
              <ProtectedRoute isAuthenticated={isLogged}>
                <SubscriberRoute
                  isEnroll={
                    (user &&
                      user.subscription &&
                      user.subscription.status === 'active') ||
                    (user && user.role === 'admin')
                      ? true
                      : false
                  }
                  Children={<CoursePage user={user} />}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login isLogged={isLogged} />} />
          <Route path="/register" element={<Register isLogged={isLogged} />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<Notfound />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
          <Route path="/paymentfail" element={<PaymentFail />} />
          {/* Protected Route--------only for admin */}
          {/* <Route path="/admin/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/admin/createcourse" element={<CreateCourses />} /> */}{' '}
          <Route
            exact
            path="/admin/createcourse"
            element={
              <ProtectedRoute isAuthenticated={isLogged}>
                <AdminRoute
                  isAdmin={user && user.role === 'admin' ? true : false}
                  Children={<CreateCourses />}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/courses"
            element={
              <ProtectedRoute isAuthenticated={isLogged}>
                <AdminRoute
                  isAdmin={user && user.role === 'admin' ? true : false}
                  Children={<AdminCourses />}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/admin/course/:id"
            element={
              <ProtectedRoute isAuthenticated={isLogged}>
                <AdminRoute
                  Children={<Lectures />}
                  isAdmin={user && user.role === 'admin' ? true : false}
                />
              </ProtectedRoute>
            }
          />{' '}
          <Route
            exact
            path="/admin/users"
            element={
              <ProtectedRoute isAuthenticated={isLogged}>
                <AdminRoute
                  isAdmin={user && user.role === 'admin' ? true : false}
                  Children={<Users />}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/programming" element={<Work />} />
          <Route path="/blog" element={<Work />} />
          <Route path="/contact" element={<Work />} />
          <Route path="/about" element={<Work />} />
        </Routes>
      </div>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
