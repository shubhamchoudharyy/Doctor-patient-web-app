import React, { useEffect,useState } from 'react'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {Col, Form, Input, Row,TimePicker,message} from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import {showLoading,hideLoading} from '../../redux/features/alertSlice'
import {useParams} from 'react-router-dom'
import moment from 'moment'

const Profile = () => {
    const {user}=useSelector((state)=>state.user)
    const [doctor,setDoctor]=useState(null)
    const params=useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleFinish=async(values)=>{
        try{
            dispatch(showLoading())
            const res=await axios.post('/api/v1/doctor/updateProfile',{...values,userId:user._id,timings:[
                moment(values.timings[0]).format('HH:mm'),
                moment(values.timings[1]).format('HH:mm'),
            ]},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
                navigate('/')

            }else{
                message.error(res.data.message)
            }
        }catch(error){
            dispatch(hideLoading())
            console.log(error)
            message.error('Something went Wrong')
        }
    }

    const getDoctorInfo=async()=>{
        try{
            const res=await axios.post('/api/v1/doctor/getDoctorInfo',{userId:params.id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setDoctor(res.data.data)
            }
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getDoctorInfo();
    },[])
  return (
    <Layout>
      <h1>Manage Profile</h1>
      {doctor && (
        <Form layout='vertical' onFinish={handleFinish} className='m-3' initialValues={{
            ...doctor,
            timings:[
                moment(doctor.timings[0],"HH:mm"),
                moment(doctor.timings[1],'HH:mm'),
            ]
        }}>
        <h4 className=''>Personal Details</h4>

            <Row gutter={20}>
                
                <Col xs={24} md={24} lg={8}>
                    <Form.Item  label={<span className="form-label">First Name</span>} name='firstname' required rules={[{required:true}]}>
                        <Input type='text' placeholder='your name' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item  label={<span className="form-label">Last Name</span>} name='lastname' required rules={[{required:true}]}>
                        <Input type='text' placeholder='your name' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item  label={<span className="form-label">Phone no.</span>} name='phone' required rules={[{required:true}]}>
                        <Input type='text' placeholder='phone no.' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item  label={<span className="form-label">Email</span>} name='email' required rules={[{required:true}]}>
                        <Input type='email' placeholder='email' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item  label={<span className="form-label">Website</span>} name='website' >
                        <Input type='text' placeholder='your website' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item  label={<span className="form-label">Address</span>} name='address' required rules={[{required:true}]}>
                        <Input type='text' placeholder='address' />
                    </Form.Item>
                </Col>
            </Row>
        <h4 className=''>Profesional Details</h4>

            <Row gutter={20}>
                
                <Col xs={24} md={24} lg={8}>
                    <Form.Item  label={<span className="form-label">Specialization</span>} name='specialization' required rules={[{required:true}]}>
                        <Input type='text' placeholder='your specialization' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item  label={<span className="form-label">Experience</span>} name='experience' required rules={[{required:true}]}>
                        <Input type='text' placeholder='your experience' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item  label={<span className="form-label">Fees Per Consultation</span>} name='feesPerConsultation' required rules={[{required:true}]}>
                        <Input type='text' placeholder='your fees per consultation' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item  label={<span className="form-label">Timings</span>} name='timings' required rules={[{required:true}]} >
                        <TimePicker.RangePicker format='HH:mm' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}></Col>
                <Col xs={24} md={24} lg={8}>
                <button className='btn btn-primary form-btn' type='submit'>Update</button>
                </Col>
            </Row>
        </Form>
      )}
    </Layout>
  )
}

export default Profile
