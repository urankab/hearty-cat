const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    joined: {
        type: Date,
        default: Date.now
    }
})

UserSchema.pre('save', function (next) {
    let user = this
    bcrypt.hash(user.password, 10, function (err, hash){
        if (err) {
            return next(err)
        }
        user.password = hash
        next()
    })
})


module.exports = mongoose.model('Register', UserSchema)