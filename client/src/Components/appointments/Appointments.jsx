import React, { useState, useEffect } from "react";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import "./Appointment.css";
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    patientName: "",
    doctorName: "",
    date: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/appointments`)
      .then((res) => setAppointments(res.data))
      .catch((error) => console.error("Error fetching appointments: ", error));
  }, []);

  const handleAddAppointment = (e) => {
    e.preventDefault();

    console.log("Adding appointment:", newAppointment);

    axios
      .post("http://localhost:5000/appointments/add", newAppointment, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((res) => {
        console.log("Response from server:", res.data);
        if (res.data) {
          setAppointments([...appointments, res.data]);
          setNewAppointment({
            patientName: "",
            doctorName: "",
            date: "",
          });
        } else {
          console.error("Unexpected response structure:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error while adding appointment: ", error);
      });
  };

  const handleUpdateAppointment = (id, e) => {
    e.preventDefault();
    axios
      .put(
        `http://localhost:5000/appointments/update/${id}`,
        selectedAppointment
      )
      .then((res) => {
        console.log(res.data);
        const updatedApp = { ...selectedAppointment, _id: id };
        setAppointments(
          appointments.map((appointment) =>
            appointment._id === id ? updatedApp : appointment
          )
        );
        setSelectedAppointment(null);
        setIsEditMode(false);
      })
      .catch((error) => {
        console.error("Error while updating appointment: ", error);
      });
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditMode(true);
  };

  const handleDeleteAppointment = (id) => {
    axios
      .delete(`http://localhost:5000/appointments/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        setAppointments(
          appointments.filter((appointment) => appointment._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error while deleting appointment: ", error);
      });
  };

  return (
    <div className="appointment-main">
      
        <div className="form-section">
          <h4>{isEditMode ? "Edit Appointment" : "Add New Appointment"}</h4>
          <form
            className="appointment-form"
            onSubmit={
              isEditMode
                ? (e) => handleUpdateAppointment(selectedAppointment._id, e)
                : handleAddAppointment
            }
          >
            <label htmlFor="patientName">Patient Name:</label>
            <input
              type="text"
              id="patientName"
              value={
                isEditMode
                  ? selectedAppointment.patientName
                  : newAppointment.patientName
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedAppointment({
                      ...selectedAppointment,
                      patientName: e.target.value,
                    })
                  : setNewAppointment({
                      ...newAppointment,
                      patientName: e.target.value,
                    })
              }
            />

            <label htmlFor="doctorName">Doctor Name:</label>
            <input
              type="text"
              id="doctorName"
              value={
                isEditMode
                  ? selectedAppointment.doctorName
                  : newAppointment.doctorName
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedAppointment({
                      ...selectedAppointment,
                      doctorName: e.target.value,
                    })
                  : setNewAppointment({
                      ...newAppointment,
                      doctorName: e.target.value,
                    })
              }
            />

            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={
                isEditMode ? selectedAppointment.date : newAppointment.date
              }
              onChange={(e) =>
                isEditMode
                  ? setSelectedAppointment({
                      ...selectedAppointment,
                      date: e.target.value,
                    })
                  : setNewAppointment({
                      ...newAppointment,
                      date: e.target.value,
                    })
              }
            />

            <button type="submit">
              {isEditMode ? "Update Appointment" : "Add Appointment"}
            </button>
          </form>
        </div>
      
      <div className="appointments">
        <h3>Appointments ({appointments.length})</h3>
        <div className="appointment-list">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              appointment={appointment}
              onEdit={handleEditAppointment}
              onDelete={handleDeleteAppointment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
