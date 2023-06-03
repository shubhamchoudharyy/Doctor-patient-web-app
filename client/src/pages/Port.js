import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message, Badge } from 'antd';
import '../styles/Layout.css';
import Appointments from './Appointments';
import Logo from '../assets/img.jpg';



const Port = () => {

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
        <div className="contents">
          <h4>WELCOME TO </h4>
          <h1>Care<span>Bridge</span></h1>
          <h3></h3>
          <div className="newsletter">
            <form>
              {user?.isDoctor ? (
                <Link to="/doctor-appointments" className="btn btn-primary">
                  Your Appointments
                </Link>
              ) : (
                <Link to="/book" className="btn btn-primary">
                  Book Appointments
                </Link>
              )}
            </form>
          </div>

        </div>
      </div>

      <section className="about">
        <div className="main">
          <img src={Logo} alt="Profile" />
          <div className="about-text">
            <h2>About Us</h2>
            {/* <h5>developer <span>& engineer</span></h5> */}
            <p>Welcome to our <span>doctor-patient </span> interaction web app! We are dedicated to improving the way doctors and patients connect and communicate. Our platform aims to streamline the healthcare experience, making it more convenient, efficient, and accessible for everyone involved.

At our core, we believe in the power of technology to enhance healthcare delivery and bridge the gap between doctors and patients. Through our web app, we provide a secure and user-friendly platform that facilitates seamless interactions and fosters better collaboration between <span>healthcare</span> providers and <span>patients.</span></p>
            {/* <button type="button">Let's talk</button> */}
          </div>
        </div>
      </section>

      <div className="service">
        <div className="title">
          <h2>Our Services</h2>
        </div>

        <div className="box">
          <div className="card">
            <i className="fa-solid fa-bars"></i>
            <h5>Appointments</h5>
            <div className="pra">
              <p>We assure you will get yourself treated carefully and can get the personal appointments of the doctor through our app</p>
              <p style={{ textAlign: 'center' }}>
                {/* <a className="button" href="#">Read More</a> */}
              </p>
            </div>
          </div>

          <div className="card">
            <i className="fa-light fa-user"></i>
            <h5>Chat</h5>
            <div className="pra">
              <p>You will also get a facility to chat with our doctor with end to end encryption  so that no other person can see your chat  </p>
              <p style={{ textAlign: 'center' }}>
                {/* <Link to='#' className="button" >Read More</Link> */}
              </p>
            </div>
          </div>

          <div className="card">
            <i className="fa-regular fa-bell"></i>
            <h5>Diet</h5>
            <div className="pra">
              <p>You also get the service to get the diet chart according to your body mass index </p>
              <p style={{ textAlign: 'center' }}>
                {/* <Link to="#" className="button" >Read More</Link> */}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-me">
        <p>You can contact us through our Social handles</p>
        {/* <Link to="#" className="button-two" >Hire Me</Link> */}
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
  )
}

export default Port;
