// This imports the mongoose module
const mongoose = require('mongoose')

// This imports the bcrypt module. 
//Bcrypt is a password hashing function designed by Niels Provos and David Mazières, based on the Blowfish cipher
const bcrypt = require('bcrypt')

// This creates a constant called SALTS and sets its value to 10. 
// SALTS is the number of rounds used when generating a salt.
const SALTS = 10

/* 
{
     username:
     password:
     email:
 
}
*/
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        maxLength: 100,
        required: [true, "Username is required"]
    },
    password: {
        type: String,
        maxLength: 50,
        required: [true, "Password is required"]
    },
    email: {
        type: String,
        maxLength: 50,
        unique: true
    }
})

userSchema.pre('save', function(next) {
    
    // creating a user variable and assigning the value of this to it.
    let user = this;

    //  using an if statement to check if the password has been modified
    if (!user.isModified('password')) return next();

    // using the bcrypt.genSalt function to generate a salt
    bcrypt.genSalt(SALTS, function(err, salt) {

        // using an if statement to check for any errors
        if (err) return next(err);

        //  using the bcrypt.hash function to hash the password
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // we are replacing the password with the hashed version
            user.password = hash;
            next();
        });
    });
});


// The code above creates a verifyPassword method on the userSchema. 
// This method takes in a new password and compares it to the password stored in the database.
// It uses the bcrypt.compare method, which returns a promise. 
//The method returns true if the passwords match, and false if they don't.
userSchema.methods.verifyPassword = async function(newPassword) {
    const isMatch = await bcrypt.compare(newPassword, this.password);
    return isMatch;
};

module.exports = mongoose.model("user", userSchema)