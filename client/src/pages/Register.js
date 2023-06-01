import React from 'react'
import {Form, Input,message} from 'antd'
import '../styles/RegisterStyles.css'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import Tilt from 'react-parallax-tilt';
const Register = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const onfinishHandler=async(values)=>{
        try{
            dispatch(showLoading())
            const res=await axios.post("/api/v1/user/register",values);
            dispatch(hideLoading())
            if(res.data.success){
                message.success('Register Successfully')
                navigate('/login')
            }else{
                message.error(res.data.message)
            }

        }catch(error){
            dispatch(hideLoading())
            console.log(error)
            message.error('Something went Wrong')
        }
    }
    
  return (
    <><div className="App">
        <div className="containers"></div>
        <div className="containers-end"></div>
        <Tilt>
      <div className="containers-ends" style={{width:'40rem', height:'40rem'}}>
        <Form layout='vertical' onFinish={onfinishHandler} className='content'>
            <h3 className='content-login'>Register Form</h3>
            <Form.Item label=''name='username'>
                <div className="inputbox">
                <Input type='text' required></Input> 
                <span>Username</span>
                <i></i>
                </div>
            </Form.Item>
            <Form.Item label=''name='name'>
                <div className="inputbox">
                <Input type='text' required></Input> 
                <span>Name</span>
                <i></i>
                </div>
            </Form.Item>
            <Form.Item label=''name='email'>
                <div className="inputbox">
                <Input type='email' required></Input> 
                <span>Email</span>
                <i></i>
                </div>
            </Form.Item>
            <Form.Item label=''name='password'>
                <div className="inputbox">
                <Input type='password' required></Input> 
                <span>Password</span>
                <i></i>
                </div>
            </Form.Item>
       
            <Link to='/login' className='m-2'>Already a user login</Link>
            <button className='submit' type='submit'>Register</button>
        </Form>
      </div>
      </Tilt>
      </div>
    </>
  )
}

export default Register
