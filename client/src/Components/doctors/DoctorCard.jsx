import React from 'react'
import './Doctor.css'
const DoctorCard = ({doctor,onEdit, onDelete}) => {
  
  return (
    <div className="doctor-card">
      <p>Name : {doctor.name}</p>
      <p>Specialty : {doctor.specialty}</p>

      <div className="btn-container">
        <button onClick={()=> onEdit(doctor)}>Edit</button>
        <button onClick={()=> onDelete(doctor)}>Delete</button>
      </div>
    </div>
  )
}

export default DoctorCard;