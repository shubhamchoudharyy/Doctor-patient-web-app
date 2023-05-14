import React, { useEffect,useState } from 'react'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {Col, Form, Image, Input, Row,TimePicker,message} from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import {showLoading,hideLoading} from '../../redux/features/alertSlice'
import {useParams} from 'react-router-dom'
import moment from 'moment'

const Profile = () => {
    const {user}=useSelector((state)=>state.user)
    const [User,setUser]=useState(null)
    const params=useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleFinish=async(values)=>{
        try{
            dispatch(showLoading())
            const res=await axios.post('/api/v1/user/updateProfile',{...values,userId:user._id},{},{
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
            const res=await axios.post('/api/v1/user/getUserInfo',{userId:params.id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setUser(res.data.data)
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
      {User && (
        <Form layout='vertical' onFinish={handleFinish} className='m-3' initialValues={{
            ...User,
            
        }}>
        <h4 className=''>Personal Details</h4>

            <Row gutter={20}>
                
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Avatar Image' name='avatarImage' required rules={[{required:true}]}>
                        <Image   src={`${user.avatarImage}`}
                                width={200}
                                alt="Example Image"
                                />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='First Name' name='name' required rules={[{required:true}]}>
                        <Input type='text' placeholder='your name' />
                    </Form.Item>
                </Col>
               
                
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Email' name='email' required rules={[{required:true}]}>
                        <Input type='email' placeholder='email' />
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
