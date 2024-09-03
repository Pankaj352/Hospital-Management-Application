const express = require("express");

const router=express.Router();
const Patient=require('../Models/Patient');

//get all the patient
router.route('/').get((req,res)=>{
    Patient.find().then(patients =>{
        res.status(201).json(patients);
    }).catch(error =>{
        res.status(400).json('Error: '+ error);
    });
});

//add new patient
router.route('/add').post((req,res)=>{
    const {name,age,gender}=req.body;
    const newPatient=new Patient({name,age,gender});
    newPatient.save().then(savedPatient=>{
        res.status(201).json(savedPatient);
    }).catch(error=>{
        res.status(400).json('Error: '+ error);
    });
});


//update an patient via id
router.route('/update/:id').put((req,res)=>{
    Patient.findById(req.params.id).then(patient =>{
        if(!patient){
            return res.status(404).json('Patient not found');

        }
        patient.name=req.body.name||patient.name;
        patient.age=req.body.age||patient.age;
        patient.gender=req.body.gender||patient.gender;

        patient.save().then(()=>{
            res.status(201).json('Patient Updated Successfully!');
        }).catch(error =>{
            res.status(400).json('Error: '+ error);
        });
    }).catch(error =>{
        res.status(400).json('Error: '+ error);
    });
});

//delete a patient
router.route('/delete/:id').delete((req,res)=>{
    Patient.findByIdAndDelete(req.params.id).then(patient=>{
        if(!patient){
            return res.status(404).json('Patient not found');
        }
        res.status(201).json('Patient deleted!');
    }).catch(error=>{
        res.status(400).json('Error: '+error);
    });
});

module.exports=router;