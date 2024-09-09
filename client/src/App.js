import React from 'react';
import './App.css';
import Appointments from './Components/appointments/Appointments';
import Doctors from './Components/doctors/Doctors';
import Patients from './Components/patients/Patients';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App = () => {
  const isLinkActive = (path) => {
    return window.location.pathname === path;
  };

  return (
    <Router>
      <div className="container">
        <h1 className='brand' >Hospital Management System</h1>

        <nav>
          <ul>
            <li className={isLinkActive('/appointments') ? 'active' : ''}>
              <Link to='/appointments'>Appointments</Link>
            </li>
            <li className={isLinkActive('/doctors') ? 'active' : ''}>
              <Link to='/doctors'>Doctors</Link>
            </li>
            <li className={isLinkActive('/patients') ? 'active' : ''}>
              <Link to='/patients'>Patients</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
