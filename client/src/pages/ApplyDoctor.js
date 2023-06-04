// import Layout from 'antd/es/layout/layout'
import Layout from '../components/Layout'
import React from 'react'
import { Col, Form, Input, Row, TimePicker, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import moment from 'moment'
const ApplyDoctor = () => {
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleFinish = async (values) => {
        try {
          dispatch(showLoading());
      
          const timings = values.timings.map((time) => moment(time).format('HH:mm'));
      
          const res = await axios.post(
            'api/v1/user/apply-doctor',
            {
              ...values,
              userId: user._id,
              timings: timings,
            },
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
          message.error('Something went wrong');
        }
      };
      
    
    return (

        <Layout>
            <h2 className='text-center' style={{color:'white'}}>Apply Doctor</h2>
            <Form layout='vertical' onFinish={handleFinish} className='m-3'  >
                <h4 className=''>Personal Details</h4>

                <Row gutter={20}>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item  label={<span className="form-label">First Name</span>} name='firstname' required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your name' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item  label={<span className="form-label">Last Name</span>} name='lastname' required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your name' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item  label={<span className="form-label">Phone no.</span>} name='phone' required rules={[{ required: true }]}>
                            <Input type='text' placeholder='phone no.' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item  label={<span className="form-label">Email</span>} name='email' required rules={[{ required: true }]}>
                            <Input type='email' placeholder='email' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item  label={<span className="form-label">Website</span>} name='website' >
                            <Input type='text' placeholder='your website' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item  label={<span className="form-label">Address</span>} name='address' required rules={[{ required: true }]}>
                            <Input type='text' placeholder='address' />
                        </Form.Item>
                    </Col>
                </Row>
                <h4 className=''>Profesional Details</h4>

                <Row gutter={20}>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item  label={<span className="form-label">Specialization</span>} name='specialization' required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your specialization' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item  label={<span className="form-label">Experience</span>} name='experience' required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your experience' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item  label={<span className="form-label">Fees Per Consultation</span>} name='feesPerConsultation' required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your fees per consultation' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item  label={<span className="form-label">Timings</span>} name='timings' required rules={[{ required: true }]} >
                            <TimePicker.RangePicker format='HH:mm' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}></Col>
                    <Col xs={24} md={24} lg={8}>
                        <button className='btn btn-primary form-btn' type='submit'>Submit</button>
                    </Col>
                </Row>
            </Form>
        </Layout>


    )
}

export default ApplyDoctor
