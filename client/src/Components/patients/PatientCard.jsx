import React from "react";
import "./patients.css";

const PatientCard = ({patient, onEdit, onDelete}) => {
  return (
    <div className="patient-card">
      <h4>Name : {patient.name}</h4>
      <p>Age : {patient.age}</p>
      <p>Gender : {patient.gender}</p>
      <div className="btn-container" style={{width:'100%'}}>
        <button type="submit" onClick={()=>onEdit(patient)} >Edit</button>
        <button type="submit" onClick={()=>onDelete(patient._id)} >Delete</button>
      </div>
    </div>
  );
};

export default PatientCard;