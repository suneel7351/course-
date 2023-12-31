import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { useDispatch } from 'react-redux';
import User from '../../redux/actions/user';
function Header({ user, isLogged }) {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.screen.width);
  const menu = useRef(null);
  const nav_list = useRef(null);
  const actualWidth = () => {
    setWidth(window.innerWidth);
  };
  let isActive = false;
  const menuClickHandler = () => {
    nav_list.current.classList.toggle('open');

    if (!isActive) {
      menu.current.childNodes[0].style.transform = 'rotate(45deg)';
      menu.current.childNodes[1].style.opacity = '0';
      menu.current.childNodes[2].style.transform = 'rotate(-45deg)';
      isActive = true;
    } else {
      menu.current.childNodes[0].style.transform = 'rotate(0)';
      menu.current.childNodes[1].style.opacity = '1';
      menu.current.childNodes[2].style.transform = 'rotate(0)';
      isActive = false;
    }
  };

  const handleLink = () => {
    nav_list.current.classList.remove('open');
    menu.current.childNodes[0].style.transform = 'rotate(0)';
    menu.current.childNodes[1].style.opacity = '1';
    menu.current.childNodes[2].style.transform = 'rotate(0)';
  };

  const logoutHandler = () => {
    dispatch(User.logout());
  };
  useEffect(() => {
    window.addEventListener('resize', actualWidth);

    return () => {
      window.removeEventListener('resize', actualWidth);
    };
  });

  return (
    <nav className={width < 879 ? 'mobile nav shadow' : 'nav shadow'} >
      <div className="header nav-wrapper ">
        <div className="brand flex items-center gap-1 text-lg text-white">
          <Link to={'/'}>
           Coder's Info
          </Link>
        </div>

        <ul className="nav-list" ref={nav_list}>
          <li onClick={handleLink}>
            <Link className='text-white' to={'/'}>Home</Link>
          </li>{' '}
          <li onClick={handleLink}>
            <Link className='text-white' to={'/courses'}>Courses</Link>
          </li>
          {/* <li onClick={handleLink}>
            <Link className='text-white' to={'/programming'}>Programming</Link>
          </li>
          <li onClick={handleLink}>
            <Link className='text-white' to={'/blog'}>Blog</Link>
          </li>
          <li onClick={handleLink}>
            <Link className='text-white' to={'/contact'}>Contact</Link>
          </li>{' '}
          <li onClick={handleLink}>
            <Link className='text-white' to={'/about'}>About</Link>
          </li> */}
        </ul>
        <div className="right">
          {/* <ColorModeSwitcher /> */}
        

          {isLogged ? (
            <div className="avatar">
              <img
                src={user && user.avatar && user.avatar.url}
                className="logged-user md:mr-8"
                alt="user"
              />
              <div className="dropdown">
                <Link to={'/profile'}>Profile</Link>
                {user && user.role && user.role === 'admin' && (
                  <>
                    {' '}
                    <Link to="/admin/createcourse">Add new Course</Link>
                    <Link to="/admin/courses">All Courses</Link>
                    <Link to="/admin/users">All Users</Link>
                  </>
                )}
                <Link
                  onClick={logoutHandler}
                  className=""
                >
                  Logout
                </Link>
              </div>{' '}
            </div>
          ) : (
            <>
              {' '}
              <Link to="/login">
                {' '}
                <button className="btn btn-secondary">Loign</button>
              </Link>
              <Link to="/register">
                {' '}
                <button className="btn btn-secondary">Signup</button>
              </Link>
            </>
          )}
          <div className="hamburger" ref={menu} onClick={menuClickHandler}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
