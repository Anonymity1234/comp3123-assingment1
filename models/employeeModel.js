const mongoose = require('mongoose')
const options = ["male", "female", "other"]


/* 
    {
     "first_name": "Tam",
     "last_name": "Harrow",
     "email": "tam@hollywood.com",
     "gender": "male",
     "salary": 125500
    }
*/ 
const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        maxLength: 100,
        required: [true, "First name is required"]
    },
    last_name: {
        type: String,
        maxLength: 50,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        maxLength: 50,
        unique: true
    },
    gender: {
        type: String,
        maxLength: 25,
        lowercase: true,
        validate(value) {
            if (!options.includes(value)) throw new Error("You can only choose male, female, or other for gender.")
        }
    },
    salary: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) throw new Error("Salary cannot be negative")
        }
    },
})

module.exports = mongoose.model("employee", employeeSchema)