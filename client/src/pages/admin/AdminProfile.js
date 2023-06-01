import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Form, Row, Col, Input, message } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import { useParams } from 'react-router-dom';

const AdminProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [initialValues, setInitialValues] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/user/updateProfile',
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate('/');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something Went Wrong');
    }
  };

  const getUserInfo = async () => {
    try {
      const res = await axios.post(
        '/api/v1/user/getUserInfo',
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        setInitialValues(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Layout>
      <h1>Profile</h1>

      <h4 className="">Personal Details</h4>
      {initialValues && (
      <Form layout="vertical" onFinish={handleFinish} className="m-3" initialValues={{...initialValues}}>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item  label={<span className="form-label">Username</span>} name="username" required rules={[{ required: true }]}>
              <Input type="text" placeholder="Username" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item  label={<span className="form-label">Name</span>} name="name" required rules={[{ required: true }]}>
              <Input type="text" placeholder="Your name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item  label={<span className="form-label">Email</span>} name="email" required rules={[{ required: true }]}>
              <Input type="email" placeholder="Email" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item  label={<span className="form-label">Height</span>} name="height">
              <Input type="text" placeholder="Height" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item  label={<span className="form-label">Weight</span>} name="weight">
              <Input type="text" placeholder="Weight" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Update
            </button>
          </Col>
        </Row>
      </Form>
      )}
    </Layout>
  );
};

export default AdminProfile;
