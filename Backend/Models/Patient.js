const { name } = require("body-parser");
const { default: mongoose } = require("mongoose");

const Schema=mongoose.Schema;

const patientsSchema=new Schema({
    name:{type:String, required:true},
    age:{type:Number, required:true},
    gender:{type:String, required:true}

});

const Patient=mongoose.model('Patient', patientsSchema);
module.exports=Patient;