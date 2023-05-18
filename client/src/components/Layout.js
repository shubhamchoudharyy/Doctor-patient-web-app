import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message, Badge } from 'antd';
import '../styles/nav.css';

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
      <div className='main'>
        <div className='layout'>
          <header>
            <nav>
              <div className='logo'>
                <a href='/'>CareBridge</a>
                <hr />
              </div>

              {sidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    className={`menu-item ${isActive && 'active'}`}
                    key={menu.name}
                  >
                    <ul>
                      <li>
                        <a href={menu.path}>{menu.name}</a>
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
                      <a href='/notification'>Notification</a>
                    </li>
                  </Badge>
                </ul>
              </div>

              <div className='menu-item' onClick={handleLogout}>
                <ul>
                  <li>
                    <a href='/login'>Logout</a>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
        </div>

        <div className='content'>
          <div className='header'></div>
          <div className='body'>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
