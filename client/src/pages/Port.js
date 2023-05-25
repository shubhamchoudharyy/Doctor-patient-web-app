import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message, Badge } from 'antd';
import '../styles/Layout.css';




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
          <h2 className="logo">Care<span>Bridge</span></h2>

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
                    <a href='/login' className='btn btn-primary'>Logout</a>
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
              
              <a href='/book' className='btn btn-primary'>Book Appointments</a>
            </form>
          </div>
        </div>
      </div>

      <section className="about">
        <div className="main">
          <img src="../shivji.jpg" alt="Profile" />
          <div className="about-text">
            <h2>About Me</h2>
            <h5>developer <span>& engineer</span></h5>
            <p>I am a student of B.E. CSE department from <span>NIT Trichy</span>. <br/>I have <span>3</span> years of experience in <span>web development</span> </p>
            <button type="button">Let's talk</button>
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
            <h5>Web development</h5>
            <div className="pra">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, sequi, excepturi nisi qui sit, obcaecati ut eaque recusandae ducimus id fugiat alias? Reiciendis nisi voluptatem, impedit aliquid praesentium at. Dolore repellat rerum debitis quod, illum voluptatum, sint quas corrupti architecto sit placeat hic quis odio, ratione aspernatur. Nostrum, eaque ad!</p>
              <p style={{ textAlign: 'center' }}>
                <a className="button" href="#">Read More</a>
              </p>
            </div>
          </div>

          <div className="card">
            <i className="fa-light fa-user"></i>
            <h5>Web development</h5>
            <div className="pra">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, sequi, excepturi nisi qui sit, obcaecati ut eaque recusandae ducimus id fugiat alias? Reiciendis nisi voluptatem, impedit aliquid praesentium at. Dolore repellat rerum debitis quod, illum voluptatum, sint quas corrupti architecto sit placeat hic quis odio, ratione aspernatur. Nostrum, eaque ad!</p>
              <p style={{ textAlign: 'center' }}>
                <a className="button" href="#">Read More</a>
              </p>
            </div>
          </div>

          <div className="card">
            <i className="fa-regular fa-bell"></i>
            <h5>Web development</h5>
            <div className="pra">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit, sequi, excepturi nisi qui sit, obcaecati ut eaque recusandae ducimus id fugiat alias? Reiciendis nisi voluptatem, impedit aliquid praesentium at. Dolore repellat rerum debitis quod, illum voluptatum, sint quas corrupti architecto sit placeat hic quis odio, ratione aspernatur. Nostrum, eaque ad!</p>
              <p style={{ textAlign: 'center' }}>
                <a className="button" href="#">Read More</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-me">
        <p>Let Me Get You A Beautiful Website</p>
        <a className="button-two" href="#">Hire Me</a>
      </div>

      <footer>
        <p>Shubham Choudhary</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eligendi suscipit explicabo aliquid natus dolorem laborum obcaecati odio repellendus deserunt.</p>
        <div className="social">
          <a href="#"><i className="fa-brands fa-facebook"></i></a>
          <a href="#"><i className="fa-brands fa-instagram"></i></a>
          <a href="#"><i className="fa-brands fa-linkedin"></i></a>
        </div>
        <p className="end">Copyright by Shubham Choudhary</p>
      </footer>
    </>
  )
}

export default Port;
