import React from 'react';
import Layout from '../components/Layout';
import { Tabs, notification, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NotificationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/get-all-notification',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        window.location.reload();
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went Wrong');
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/delete-all-notification',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something Went Wrong');
    }
  };

  return (
    <Layout>
       <div style={{ height: '100vh',width:'170vh', display: 'flex', flexDirection: 'column',transform: 'translate(0, 0)' }}>
      
      <h2 className='text-center' style={{marginTop:'10%', transform: 'translate(0, 0)' ,color:'white'}} >Notifications</h2>
      <Tabs style={{ margin: '15px', padding: '15px' }}>
        <Tabs.TabPane tab='Unread' key={0} style={{ color: 'white' }}>
          <div className='d-flex justify-content-end'>
            <h4
              className='p-2 text-primary'
              style={{ cursor: 'pointer' }}
              onClick={handleMarkAllRead}
            >
              Mark All Read
            </h4>
          </div>
          {user?.notification.map((notificationMsg) => (
            <div
              className='card'
              key={notificationMsg._id}
              onClick={() => navigate(notificationMsg.onClickPath)}
              style={{ cursor: 'pointer' }}
            >
              <div className='card-text'>{notificationMsg.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab='Read' key={1} style={{ color: 'white' }}>
          <div className='d-flex justify-content-end'>
            <h4
              className='p-2 text-primary'
              style={{ cursor: 'pointer' }}
              onClick={handleDeleteAllRead}
            >
              Delete All Read
            </h4>
          </div>
          {user?.seennotification.map((notificationMsg) => (
            <div
              className='card'
              key={notificationMsg._id}
              onClick={() => navigate(notificationMsg.onClickPath)}
              style={{ cursor: 'pointer' }}
            >
              <div className='card-text'>{notificationMsg.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
      </div>
    </Layout>
  );
};

export default NotificationPage;
