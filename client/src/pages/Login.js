import React, {useEffect} from 'react'
import {Form, Input,message} from 'antd'
import '../styles/RegisterStyles.css'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {showLoading,hideLoading} from '../redux/features/alertSlice'
import axios from 'axios'
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
    <div className="form-container">
      <Form layout='vertical' onFinish={onfinishHandler} className='register-form'>
          <h3 className='text-center'>Login</h3>
          
          <Form.Item label='Email'name='email'>
              <Input type='email' required></Input> 
          </Form.Item>
          <Form.Item label='Password'name='password'>
              <Input type='password' required></Input> 
          </Form.Item>
          
          <Link to='/register' className='m-2'>Register here</Link>
          <button className='btn btn-primary' type='submit'>Login</button>
      </Form>
    </div>
  </>
  )
}

export default Login
