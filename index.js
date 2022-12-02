const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')
const employeeRoutes = require('./routes/employeeRoutes')

const DB_URL = "mongodb+srv://kafabnu101:65qX6iKL2ENMmQj@cluster0.xlocajv.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority"
const PORT_NUM = process.env.PORT || 8089
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/api", userRoutes)
app.use("/api/emp", employeeRoutes)


mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database.");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.listen(PORT_NUM, () => {
    console.log("Server is listening on port", PORT_NUM);
});