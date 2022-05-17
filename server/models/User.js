const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name'],
        minlength: [3, 'Minimum length of 3 Name'],
        maxlength: [50, 'Max length of 50 Name']
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'E-Mail'],
        minlength: [3, 'Minimum length of 3 E-Mail'],
        maxlength: [50, 'Max length of 50 Name'],
        match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid E-Mail',
        ],
        unique: [true, 'E-Mail already in use']
    },
    password: {
        type: String,
        required: [true, 'password'],
        minlength: [3, 'Minimum length of 3 password'],
    },
})

//hash password
UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

//create JWT and return token
UserSchema.methods.createJWT = function () {
    return jwt.sign({userId: this._id, name: this.name}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30d',
    })
}
//compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)