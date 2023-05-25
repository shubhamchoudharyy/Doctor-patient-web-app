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
            dispatch(showLoading())
            const res = await axios.post('api/v1/user/apply-doctor', {
                ...values, userId: user._id, timings: [
                    moment(values.timings[0]).format('HH:mm'),
                    moment(values.timings[1]).format('HH:mm'),
                ]
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (res.data.success) {
                message.success(res.data.message)
                navigate('/')

            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error)
            message.error('Something went Wrong')
        }
    }
    return (

        <Layout>
            <h1 className='text-center'>Apply Doctor</h1>
            <Form layout='vertical' onFinish={handleFinish} className='m-3'  >
                <h4 className=''>Personal Details</h4>

                <Row gutter={20}>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='First Name' name='firstname' required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your name' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='last Name' name='lastname' required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your name' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='Phone No.' name='phone' required rules={[{ required: true }]}>
                            <Input type='text' placeholder='phone no.' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='Email' name='email' required rules={[{ required: true }]}>
                            <Input type='email' placeholder='email' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='Website' name='website' >
                            <Input type='text' placeholder='your website' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='Address' name='address' required rules={[{ required: true }]}>
                            <Input type='text' placeholder='address' />
                        </Form.Item>
                    </Col>
                </Row>
                <h4 className=''>Profesional Details</h4>

                <Row gutter={20}>

                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='Specialization' name='specialization' required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your specialization' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='Experience' name='experience' required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your experience' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='Fees Per Consultation' name='feesPerConsultation' required rules={[{ required: true }]}>
                            <Input type='text' placeholder='your fees per consultation' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label='Timigs' name='timings' required rules={[{ required: true }]} >
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
