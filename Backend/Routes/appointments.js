const express = require("express");
const router = express.Router();
const Appointment = require('../Models/Appointment');

// Get all the appointments
router.route('/').get((req, res) => {
    Appointment.find()
        .then(appointments => {
            res.json(appointments);
        })
        .catch(error => {
            res.status(400).json('Error: ' + error);
        });
});

// Add a new appointment
router.route('/add').post((req, res) => {
    const { patientName, doctorName, date } = req.body;

    if (!patientName || !doctorName || !date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newAppointment = new Appointment({ patientName, doctorName, date });

    newAppointment.save()
        .then(savedAppointment => {
            res.json(savedAppointment);
        })
        .catch(error => {
            res.status(400).json('Error: ' + error);
        });
});


// Update an appointment's data
router.put('/update/:id', (req, res) => {
    Appointment.findById(req.params.id)
        .then(appointment => {
            if (!appointment) {
                return res.status(404).json('Appointment not found');
            }
            // Optionally validate req.body here

            appointment.patientName = req.body.patientName || appointment.patientName;
            appointment.doctorName = req.body.doctorName || appointment.doctorName;
            appointment.date = req.body.date || appointment.date;

            return appointment.save();
        })
        .then(() => {
            res.json('Appointment updated successfully!');
        })
        .catch(error => {
            res.status(400).json('Error: ' + error);
        });
});


// Delete an appointment
router.route('/delete/:id').delete((req, res) => {
    Appointment.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json('Appointment deleted.');
        })
        .catch(error => {
            res.status(400).json('Error: ' + error);
        });
});

module.exports = router;
