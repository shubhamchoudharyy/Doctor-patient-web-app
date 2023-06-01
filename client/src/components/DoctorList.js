import React from 'react'
import { useNavigate } from 'react-router-dom'


function DoctorList({doctor}) {
  const navigate=useNavigate()
  return (
    <>
    <div className='card m-2'
    style={{cursor:'pointer',color:'white',backgroundColor:'rgba(255,255,255,0.1)',height:'100%'}} onClick={()=>navigate(`/doctor/book-appointment/${doctor._id}`)}>
        <div className="card-header">
            Dr. {doctor.firstname} {doctor.lastname}
        </div>
        <div className="card-body">
          <p>
            <b>Speciality:</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience:</b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Consultation:</b> {doctor.feesPerConsultation}
          </p>
          <p>
            <b>Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
        </div>
    </div>
    
    </>
  )
}

export default DoctorList
