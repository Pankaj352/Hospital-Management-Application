const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const appointmentSchema=new Schema({
    patientName:{type:String,required:true},
    doctorName:{type:String,required:true},
    date:{type:Date,required:true},
})

const Appointment=mongoose.model('Appointment', appointmentSchema);
module.exports=Appointment;