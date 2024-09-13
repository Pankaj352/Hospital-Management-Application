import React, { useEffect, useState } from 'react'
import axios from "axios";
import DoctorCard from './DoctorCard';
import './Doctor.css';

const Doctors = () => {
  const [doctors,setDoctors]=useState([]);
  const [newDoctor, setNewDoctor]=useState({
    name:'',
    specialty:" "
  });

  const [selectedDoctor, setSelectedDoctor]=useState(null);
  const [isEditMode, setIsEditMode]=useState(false);

  useEffect(()=>{
    axios.get('http://localhost:5000/doctors').then(res=>{
      setDoctors(res.data);
     }).catch(error=>{
      console.error("Error while fetching doctors: ", error);
     })
  }, []);


  const handleAddDoctor = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:5000/doctors/add',newDoctor).then(res=> {
      console.log(res.data);
      setDoctors([...doctors,res.data]);
      setNewDoctor({
        name:'',
        specialty:''
      });
    }).catch(error=>{
        console.error('Error while adding doctors');
    });
  }


  const handleUpdateDoctor=(id,e)=>{
    e.preventDefault();
    axios.put(`http://localhost:5000/doctors/update/${id}`,selectedDoctor).then(res=>{
      const updateDoctor={...selectedDoctor,_id:id};
      console.log('update doctor',updateDoctor);
      setDoctors(doctors.map(doctor=>(doctor._id?updateDoctor:doctor)));
      setSelectedDoctor(null);
      setIsEditMode(false);
    }).catch(error=>{
      console.error('Error while updating doctor: ',error);
    });
  }

  const handleDeleteDoctor=(id)=>{
    axios.delete(`http://localhost:5000/doctors/delete/${id}`).then(res=>{
      console.log(res.data);
      setDoctors(doctors.filter(doctor=>(doctor._id.id)));
    }).catch(error=>{
      console.error('Error while deleting doctor');
    })
  }


  const handleEditDoctor=(doctor)=>{
    setSelectedDoctor(doctor);
    setIsEditMode(true);
  }
  return (
    <div className='doctor-main'>
      <div className="form-section">
        <h4>{isEditMode?'Edit Doctor':'Add New Doctor'}</h4>
        <form action="" onSubmit={isEditMode?(e)=>handleUpdateDoctor(selectedDoctor._id,e):handleAddDoctor}>
          <label htmlFor="">Name: </label>
          <input type="text" value={isEditMode?selectedDoctor.name:newDoctor.name} onChange={(e)=>isEditMode? setSelectedDoctor({...selectedDoctor,name:e.target.value}): setNewDoctor({...newDoctor,name:e.target.value})} />
          <label htmlFor="">Specialty: </label>
          <input type="text" value={isEditMode?selectedDoctor.specialty:newDoctor.specialty} onChange={(e)=>isEditMode? setSelectedDoctor({...selectedDoctor,specialty:e.target.value}): setNewDoctor({...newDoctor,specialty:e.target.value})} />
          <br />
          <button type="submit">{isEditMode ? 'Update Doctor' : 'Add Doctor'}</button>
        </form>
      </div>
      <div className="doctors-section">
        <h3>Doctors ({doctors.length})</h3>
        <div className="doctor-list">
          {doctors.map(doctor=>(
            <DoctorCard key={doctor._id} doctor={doctor} onEdit={handleEditDoctor} onDelete={handleDeleteDoctor} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors