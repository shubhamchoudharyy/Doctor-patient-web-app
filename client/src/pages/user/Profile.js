import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout'
import {Form,Row,Col,Input,message} from 'antd'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import {showLoading,hideLoading} from '../../redux/features/alertSlice'
import {useParams} from 'react-router-dom'

const Profile = () => {
    const {user}=useSelector((state)=>state.user)
    const [User,setUser]=useState(null)
    const params=useParams()
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleFinish=async(values)=>{
        try{
            dispatch(showLoading())
            const res=await axios.post('/api/v1/user/updateProfile',{...values,userId:user._id},{
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
            message.error('Something Went Wrong')
        }
    }

    const getUserInfo=async()=>{
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
        getUserInfo();
    },[])
  return (
    <Layout>
      <h1>profile</h1>

      <h4 className=''>Personal Details</h4>
      <Form layout='vertical' onFinish={handleFinish} className='m-3' initialValues={{User}}>

            <Row gutter={20}>
                
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='User Name' name='username' required rules={[{required:true}]}>
                        <Input type='text' placeholder='username' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Name' name='name' required rules={[{required:true}]}>
                        <Input type='text' placeholder='your name' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Email' name='email' required rules={[{required:true}]}>
                        <Input type='email' placeholder='email' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Height' name='height' >
                        <Input type='text' placeholder='height' />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                    <Form.Item label='Weight' name='weight' >
                        <Input type='text' placeholder='Weight' />
                    </Form.Item>
                </Col>
                
                <Col xs={24} md={24} lg={8}></Col>
                <Col xs={24} md={24} lg={8}>
                <button className='btn btn-primary form-btn' type='submit'>Update</button>
                </Col>
            </Row>
            </Form>
    </Layout>
  )
}

export default Profile
