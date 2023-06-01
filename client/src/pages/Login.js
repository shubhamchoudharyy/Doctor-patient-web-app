import React, {useEffect} from 'react'
import {Form, Input,message} from 'antd'
import '../styles/RegisterStyles.css'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {showLoading,hideLoading} from '../redux/features/alertSlice'
import axios from 'axios'
import Tilt from 'react-parallax-tilt'
const Login = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {user}=useSelector((state)=>state.user)

 
  
  const onfinishHandler=async(values)=>{
    try{
      dispatch(showLoading())
      const res=await axios.post('/api/v1/user/login',values)
      window.location.reload()
      dispatch(hideLoading())
      if(res.data.success){
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('chat-app-user',JSON.stringify(res.data.user))
        message.success('Login Succesfully')
        
        
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
    <>
    <div className="App">
      <div className="containers"></div>
      <div className="containers-end"></div>
      <Tilt>
    <div className="containers-ends">
      <Form layout='vertical' onFinish={onfinishHandler} className='content'>
          <h3 className='content-login'>Login</h3>
          
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
         
          
          <Link to='/register' className='m-2'>Register here</Link>
          <button className='submit' type='submit'>Login</button>
      </Form>
    </div>
    </Tilt>
    </div>
    
  </>
  )
}

export default Login
