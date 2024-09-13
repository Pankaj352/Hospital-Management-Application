import React, { useEffect, useState } from "react";
import "./patients.css";
import axios from "axios";
import PatientCard from "./PatientCard";
const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/patients")
      .then((res) => setPatients(res.data))
      .catch((error) =>
        console.error("Error while fetching patients " + error)
      );
  }, []);

  const handleAddPatient = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/patients/add", newPatient)
      .then((res) => {
        console.log(res.data);
        setPatients([...patients, res.data]);
        setNewPatient({ name: "", age: "", gender: "" });
      })
      .catch((error) => {
        console.log("Error while adding patient ", error);
      });
  };

  const handlUpdatePatient = (id, e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/patients/update/${id}`, selectedPatient)
      .then((res) => {
        const updatePatient = { ...selectedPatient, _id: id };
        console.log("update patient", updatePatient);
        setPatients(
          patients.map((patient) =>
            patient._id === id ? updatePatient : patient
          )
        );
        setSelectedPatient(null);
        setIsEditMode(false);
      })
      .catch((error) => console.log("Error while updating patient", error));
  };

  const handleDeletePatient = (id) => {
    axios
      .delete(`http://localhost:5000/patients/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        setSelectedPatient(null);
        setPatients(patients.filter((patient) => patient._id !== id));
      })
      .catch((error) => console.log("Error while deleting patient", error));
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setIsEditMode(true);
  };

  return (
    <div className="patient-main">
      <div className="form-section">
        <h4>{isEditMode ? "Edit Patient" : "Add New Patient"}</h4>
        <form
          action=""
          onSubmit={
            isEditMode
              ? (e) => handlUpdatePatient(selectedPatient._id, e)
              : handleAddPatient
          }
        >
          <div className="form-group">
            <label htmlFor="">Name: </label>
            <input
              type="text"
              value={isEditMode ? selectedPatient.name : newPatient.name}
              onChange={(e) =>
                isEditMode
                  ? setSelectedPatient({
                      ...selectedPatient,
                      name: e.target.value,
                    })
                  : setNewPatient({ ...newPatient, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Age: </label>
            <input
              type="text"
              value={isEditMode ? selectedPatient.age : newPatient.age}
              onChange={(e) =>
                isEditMode
                  ? setSelectedPatient({
                      ...selectedPatient,
                      age: e.target.value,
                    })
                  : setNewPatient({ ...newPatient, age: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Gender: </label>
            <input
              type="text"
              value={isEditMode ? selectedPatient.gender : newPatient.gender}
              onChange={(e) =>
                isEditMode
                  ? setSelectedPatient({
                      ...selectedPatient,
                      gender: e.target.value,
                    })
                  : setNewPatient({ ...newPatient, gender: e.target.value })
              }
            />
          </div>

          <button type="submit" className="submit-btn">{isEditMode?'Update Patient':'Add Patient'}</button>
        </form>
      </div>

      <div className="patients-section">
        <h4>Patients ({patients.length})</h4>
        <div className="patient-list">
          {patients.map(patient=>(
            <PatientCard key={patient._id}  patient={patient} onEdit={handleEditPatient} onDelete={handleDeletePatient} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Patients;
