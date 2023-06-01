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
    
  }, [user])

 

  
  return (
    <Layout >
      
      <h2 className='text-center' style={{marginTop:'0%' ,color:'white',width:'170vh'}}>Book Your Appointment</h2>
      <div className='d-flex doct' style={{color:'white'}}>
      <Row  className='doc' style={{color:'white'}}>
        {doctors && doctors.map((doctor)=><DoctorList doctor={doctor} style={{color:'white'}} />
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
