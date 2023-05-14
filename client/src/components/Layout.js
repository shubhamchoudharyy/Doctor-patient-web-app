import React from 'react'
// import '../styles/LayoutStyles.css'
// import { adminMenu, userMenu } from '../Data/data'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { message,Badge } from 'antd';
import '../styles/nav.css'
const Layout = ({children}) => {
    
    const {user}=useSelector((state)=>state.user)
    const location=useLocation()
    const navigate=useNavigate()
    const handleLogout=()=>{
        localStorage.clear()
        message.success('Logout Successfully')
        navigate('/login')
    }

    // ***********doctor menu ************
        const doctorMenu=[
        {
            name:'Home',
            path:'/',
            icon:'fa-solid fa-house',
        },
        {
            name:'Appointments',
            path:'/doctor-appointments',
            icon:'fa-solid fa-list',
        },
       
        {
            name:'Profile',
            path:`/doctor/profile/${user?._id}`,
            icon:'fa-solid fa-user',
        },
        {
            name:'Chat',
            path:'/chat',
            icon:'fa-light fa-user-doctor-message',
        },
        // {
        //     name:'Logout',
        //     path:'/login',
        //     icon:'fa-light fa-user-doctor-message',
        // },
       
       
       
    ]
    // **************doctor menu ***************

    // ************user Menu *******************

    const userMenu=[
        {
            name:'Home',
            path:'/',
            icon:'fa-solid fa-house',
        },
        {
            name:'Appointments',
            path:'/appointments',
            icon:'fa-solid fa-list',
        },
        {
            name:'Apply as a Doctor',
            path:'/apply-doctor',
            icon:'fa-solid fa-user-doctor',
        },
        {
            name:'Profile',
            path:`/user/profile/${user?._id}`,
            icon:'fa-solid fa-user',
        },
        {
            name:'Chat',
            path:'/chat',
            icon:'fa-light fa-user-doctor-message',
        },
        {
            name:'Diet',
            path:'/diet',
            icon:'fa-solid fa-pan-food',
        },
       
       
    ]
    //**************user menu**********/ 


    // ***********admin menu **************/
    const adminMenu=[
        {
            name:'Home',
            path:'/',
            icon:'fa-solid fa-house',
        },
      
        {
            name:'Doctors',
            path:'/admin/doctors',
            icon:'fa-solid fa-user-doctor',
        },
        {
            name:'Users',
            path:'/admin/users',
            icon:'fa-solid fa-user',
        },
        {
            name:'Profile',
            path:`/admin/profile/${user?._id}`,
            icon:'fa-solid fa-user',
        },
        {
            name:'chat',
            path:`/chat`,
            icon:'fa-solid fa-user',
        },
      
       
     
    ]

    // ************admin Menu *************

    const sidebarMenu=user?.isAdmin ? adminMenu :user?.isDoctor ? doctorMenu :userMenu;
  return (
    <>
    <div className="main">
        <div className="layout">
            <header>
            <nav>
                <div className="logo">
                    <a href='/'>CareBridge</a>
                    <hr /></div>
                {/* <div className=""> */}
                    
                    {sidebarMenu.map((menu)=>{
                        const isActive=location.pathname===menu.path
                        return(
                            <>
                            <div className={`menu-item ${isActive && 'active'}`}>
                                {/* <i className={menu.icon}></i> */}
                                <ul>
                                <li><a href={menu.path}>{menu.name}</a></li>
                                {/* <li><a href='/login' onClick={handleLogout}>Logout</a></li> */}
                                </ul>
                            </div>
                            </>
                        )
                    })}
                    
                     <div className={`menu-item`} >
                    <ul>
                        <Badge count={user && user.notification.length} dot style={{ fontSize: '20px', marginTop: '0px' }}>
                        <li><a href='/notification'>Notification</a></li>
                        </Badge>
                    </ul>       
                    </div>
                     <div className={`menu-item`} onClick={handleLogout}>
                    <ul>
                        <li><a href='/login'>Logout</a></li>
                    </ul>       
                    </div>
                    {/* <div className={`menu-item `} onClick={handleLogout}>
                                <i className='fa-solid fa-right-from-bracket'></i>
                                <Link to='/login'>Logout</Link>
                            </div> */}
                {/* </div> */}
                </nav>
            </header>
            </div>
            
            <div className="content">
                <div className="header">
                    {/* <div className="header-content" style={{cursor:'pointer'}}>
                        <Badge count={user && user.notification.length} onClick={()=>{
                            navigate('/notification')
                        }}>
                        <i class='fa-solid fa-bell'></i>
                        </Badge>
                        <Link to='/profile'>{user?.name}</Link>
                    </div> */}
                </div>
                <div className="body">{children}</div>
            </div>
        {/* </div> */}
    </div>
      
    </>
  )
}

export default Layout
