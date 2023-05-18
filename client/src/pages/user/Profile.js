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
        <div className="container emp-profile">
            <form method="">
                <div className="row">
                    <div className="col-md-4">
                        <img src={user.avatarImage} alt='avatar' />
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                            <h5>{user.name}</h5>
                            <h5>{user.email}</h5>

                            <ul className='nav nav-tabs' role='tablist'>
                                <li className='nav-item'>
                                    <a className='nav-link active' href='#home' id='home-tab' data-toggle='tab' role='tab'>About</a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link active' href='#profile' id='profile-tab' data-toggle='tab' role='tab'>Timeline</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <input type='submit' className='profile-edit-btn' value='Edit Profile' name='btnAddMore'/> 
                    </div>
                    
                </div>
                
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-work">
                            <p>Work Link</p>
                            <a href='https://google.com' target='search'>Google</a> <br/>
                            <a href='https://google.com' target='search'>Google</a> <br/>
                            <a href='https://google.com' target='search'>Google</a> <br/>
                            <a href='https://google.com' target='search'>Google</a> <br/>
                        </div>
                    </div>
                    <div className="col-md-8 pl-5 about-info">
                        <div className="tab-content profile-tab" id='myTabContent' >
                            <div className="tab-pane fade show active" id='home' role='tabpanel' aria-labelledby='home-tab'></div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
     
    </Layout>
  )
}

export default Profile
