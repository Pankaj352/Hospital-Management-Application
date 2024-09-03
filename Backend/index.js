const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const appointmentRouter = require('./Routes/appointments');
const patientsRouter = require('./Routes/patients');
const doctorsRouter = require('./Routes/doctors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/hospitalManagementDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected successfully...');
}).catch(error => {
    console.error(error);
});

app.use('/appointments', appointmentRouter);
app.use('/patients', patientsRouter);
app.use('/doctors', doctorsRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
