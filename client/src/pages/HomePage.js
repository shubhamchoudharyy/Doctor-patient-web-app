import React, { useEffect,useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { Row } from 'antd'
import DoctorList from '../components/DoctorList'
import '../styles/Home.css'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



const HomePage = () => {

  const navigate=useNavigate()
  const {user}=useSelector((state)=>state.user)

 

  const [doctors,setDoctors]=useState([])

  
  const getUserData=async()=>{
    try{
      const res=await axios.get('/api/v1/user/getAllDoctors',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`,
        },
      })
      if(res.data.success){
        setDoctors(res.data.data)
      }
    }catch(error){
      console.log(error)

    }
  }

  useEffect(() => {
    getUserData()
    if (user && !user.isAvatarImageSet) {
      navigate('/setAvatar')
    }
  }, [user])

  if (user && !user.isAvatarImageSet) {
    return null // or some other placeholder while waiting for redirection
  }

  
  return (
    <Layout >
      
      <h1 className='text-right m-5'>Home Page</h1>
      <div className='card'>
      <Row  className='doc'>
        {doctors && doctors.map((doctor)=><DoctorList doctor={doctor} />
       )}
      </Row>
      {/* <div className="d-flex">
      <button className='btn btn-primary m-2 book' >Book an appointment</button>
      <button className='btn btn-primary m-2 book' >Reschedule an appointment</button>
      </div> */}
      </div>
      
    </Layout>
    
    )
}

export default HomePage
