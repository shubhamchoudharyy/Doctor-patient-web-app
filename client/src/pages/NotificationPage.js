import React from 'react';
import Layout from '../components/Layout';
import { Tabs, message } from 'antd';
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
      dispatch(showLoading()); // Assuming loading state is handled by showLoading action
      const res = await axios.post(
        '/api/v1/user/get-all-notification',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading()); // Assuming hideLoading action hides the loading state
      if (res.data.success) {
        window.location.reload();
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading()); // Assuming hideLoading action hides the loading state
      console.log(error);
      message.error('Something went Wrong');
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading()); // Assuming loading state is handled by showLoading action
      const res = await axios.post(
        '/api/v1/user/delete-all-notification',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading()); // Assuming hideLoading action hides the loading state
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading()); // Assuming hideLoading action hides the loading state
      console.log(error);
      message.error('Something Went Wrong');
    }
  };

  return (
    <Layout>
      <h2 className='text-center' style={{ marginTop: '', color: 'white', width: '170vh' }}>Notifications</h2>
      <Tabs style={{ margin: '15px', padding: '15px' }}>
        <Tabs.TabPane tab={<span style={{ color: 'white' }}>Unread</span>} key={0}>
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
              className='d-flex'
              key={notificationMsg._id}
              onClick={() => navigate(notificationMsg.onClickPath)}
              style={{ cursor: 'pointer', margin: '3%', color: 'white' }}
            >
              <div className='card-text'>{notificationMsg.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab={<span style={{ color: 'white' }}>Read</span>} key={1}>
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
              className='d-flex'
              key={notificationMsg._id}
              onClick={() => navigate(notificationMsg.onClickPath)}
              style={{ cursor: 'pointer', margin: '3%', color: 'white' }}
            >
              <div className='card-text'>{notificationMsg.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
