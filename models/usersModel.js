var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_INDEX = 10; //large value is stronger, but takes longer

var userSchema = mongoose.Schema({
    userName: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    realName: String,
    password: String,
    created: {
        type: Number,
        default: () => Date.now()
    }
    //user attributes go here
});

userSchema.pre('save', function(next) {
    var user = this;

    //user.email= user.email.toLowerCase();
    //only hash password if modified or a new user
    if (!user.isModified('password')) {
        return next();
    };

//generate a salt value to encrypt our password
    bcrypt.genSalt(SALT_INDEX, function(saltErr, salt) {
        if (saltErr) {
            console.log("There is a salt error: ", saltErr);
            return next(saltErr);
        } else {
            console.log("SALT GENERATED: ", salt);
        }

//hasing it!
        bcrypt.hash(user.password, salt, function(hashErr, hashedPassword){
          if(hashErr){
            console.log("The hash error: ", hashErr)
            return next(hashErr);
          }
          else{

            //override the plain text passowrd with the hashed one
            user.password = hashedPassword;
            next();
          }
        })

    })

});

module.exports = mongoose.model('User', userSchema, 'authUsers')
