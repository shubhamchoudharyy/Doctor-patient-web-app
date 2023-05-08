import React from 'react'

function DoctorList({doctor}) {
  return (
    <>
    <div className='card p-2'>
        <div className="card-header">
            Dr. {doctor.firstname} {doctor.lastname}
        </div>
    </div>
    </>
  )
}

export default DoctorList
