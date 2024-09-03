const express = require("express");
const router=express.Router();
const Doctor=require('../Models/Doctor');

//get all doctors
router.route('/').get((req, res) => {
    Doctor.find()
        .then(doctors => {
            if (!doctors || doctors.length === 0) {
                return res.status(404).json("No doctors found!");
            }
            res.status(200).json(doctors);  // Status 200 for a successful GET request
        })
        .catch(error => {
            res.status(400).json('Error: ' + error);  // Handling errors
        });
});


//add new doctor
router.route('/add').post((req, res) => {
    const { name, specialty } = req.body;

    const newDoctor = new Doctor({ name, specialty });

    newDoctor.save()
        .then(savedDoctor => {
            res.json(savedDoctor);  
        })
        .catch(error => {
            res.status(400).json("Error: " + error); 
        });
});


//update doctor by id

router.route('/update/:id').put((req, res) => {
    Doctor.findById(req.params.id)
        .then(doctor => {
            if (!doctor) {
                return res.status(404).json("Doctor not found!");
            }

            // Update the doctor's information
            doctor.name = req.body.name || doctor.name;
            doctor.specialty = req.body.specialty || doctor.specialty;

            return doctor.save();
        })
        .then(() => {
            res.status(200).json('Doctor updated!');
        })
        .catch(error => {
            res.status(400).json('Error: ' + error);
        });
});

//delete doctor by id
router.route('/delete/:id').delete((req, res) => {
    Doctor.findByIdAndDelete(req.params.id)
        .then(doctor => {
            if (!doctor) {
                return res.status(404).json('Doctor not found');
            }
            res.json('Doctor deleted');
        })
        .catch(error => {
            res.status(400).json("Error: " + error);
        });
});


module.exports=router;