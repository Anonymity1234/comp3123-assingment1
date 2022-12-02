const express = require('express')
const employeeModel = require('../models/employeeModel');
const routes = express.Router()

// Create an employee
routes.post('/employees', async (req, res) => {
    try {
        const newEmployee = new employeeModel(req.body)
        await newEmployee.save()
        res.status(201).send({
            created_employee: newEmployee
        })
    } catch (err) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});

// Show all employees
routes.get('/employees', async(req, res) => {
    try {
        const allEmployees = await employeeModel.find()
        res.status(200).send({
            all_employees: allEmployees
        })
    } catch (err) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});

//  Fetch an employee with employeeId
routes.get('/employees/:employeeId', async(req, res) => {
    try {
        const locatedEmployee = await employeeModel.findById(req.params.employeeId)
        res.status(200).send({
            retrieved_employee: locatedEmployee
        })
    } catch (err) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});

// Update an employee with employeeId
routes.put('/employees/:employeeId', async(req, res) => {
    try {
        const updatedEmployee = await employeeModel.findByIdAndUpdate(req.params.employeeId, req.body, { runValidators: true})
        res.status(200).send({
            updated_employee: updatedEmployee
        })
    } catch (err) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});

// Delete an employee with employeeId
routes.delete('/employees', async(req, res) => {
    try {
        const deletedEmployee = await employeeModel.findByIdAndDelete(req.query.eid)
        res.status(204).send({
            "status": true, deleted_employee: deletedEmployee
        })
    } catch (err) {
        res.status(500).send({
            "status": false, "message": err.message
        })
    }
});

module.exports = routes