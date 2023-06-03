import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message, Badge } from 'antd';
import '../styles/Layout.css';

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success('Logout Successfully');
    navigate('/login');
  };

  const doctorMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'fa-solid fa-house',
    },
    {
      name: 'Appointments',
      path: '/doctor-appointments',
      icon: 'fa-solid fa-list',
    },
    {
      name: 'Profile',
      path: `/doctor/profile/${user?._id}`,
      icon: 'fa-solid fa-user',
    },
    {
      name: 'Chat',
      path: '/chat',
      icon: 'fa-light fa-user-doctor-message',
    },
  ];

  const userMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'fa-solid fa-house',
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: 'fa-solid fa-list',
    },
    {
      name: 'Apply as a Doctor',
      path: '/apply-doctor',
      icon: 'fa-solid fa-user-doctor',
    },
    {
      name: 'Profile',
      path: `/user/profile/${user?._id}`,
      icon: 'fa-solid fa-user',
    },
    {
      name: 'Chat',
      path: '/chat',
      icon: 'fa-light fa-user-doctor-message',
    },
    {
      name: 'Diet',
      path: '/diet',
      icon: 'fa-solid fa-pan-food',
    },
  ];

  const adminMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'fa-solid fa-house',
    },
    {
      name: 'Doctors',
      path: '/admin/doctors',
      icon: 'fa-solid fa-user-doctor',
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: 'fa-solid fa-user',
    },
    {
      name: 'Profile',
      path: `/admin/profile/${user?._id}`,
      icon: 'fa-solid fa-user',
    },
    {
      name: 'chat',
      path: `/chat`,
      icon: 'fa-solid fa-user',
    },
  ];

  const sidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <>
      <header>
        <div className="hero">
          <nav>
            <Link to='/' className='custom'><h2 className="logo">Care<span>Bridge</span></h2></Link>

            {sidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`menu-item ${isActive && 'active'}`}
                  key={menu.name}
                >
                  <ul>
                    <li>
                      <Link to={menu.path} className='custom'>{menu.name}</Link>
                    </li>
                  </ul>
                </div>
              );
            })}

            <div className='menu-item'>
              <ul>
                <Badge
                  count={user && user.notification.length}
                  dot
                  style={{ fontSize: '20px', marginTop: '0px' }}
                >
                  <li>
                    <Link to='/notification' className='custom'>Notification</Link>
                  </li>
                </Badge>
              </ul>
            </div>

            <div className='menu-item' onClick={handleLogout}>
              <ul>
                <li>
                  <Link to='/login' className='btn btn-primary'>Logout</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <div className='contents' >
        <div className='header'></div>
        <div className='body' style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
          {children}
        </div>
      </div>

      <footer>
        <p>CareBridge</p>
        <p></p>
        <div className="social">
          <Link to="#" className='custom'><i className="fa-brands fa-facebook"></i></Link>
          <Link to="#" className='custom'><i className="fa-brands fa-instagram"></i></Link>
          <Link to="#" className='custom'><i className="fa-brands fa-linkedin"></i></Link>
        </div>
        <p className="end">Copyright by CareBridge</p>
      </footer>
    </>
  );
};

export default Layout;
