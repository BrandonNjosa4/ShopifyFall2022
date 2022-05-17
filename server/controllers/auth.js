const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')


//function to register user

const register = async (req, res) => {
    //create user in database
    const user = await User.create({ ...req.body })
    //get token created from function
    const authToken = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: {name: user.name}, authToken })
}

//function to login user
const login = async (req, res) => {
    //get email and password from request body
    const {email, password} = req.body
    //if no email or password throw error
    if (!email || !password) {
        throw new BadRequestError('Please provide an email and password')
    }
    // get user from database
    const user = await User.findOne({email})
    //if no user found error
    if (!user){
        throw new UnauthenticatedError('Invalid Credentials')
    }
    //compare password
    const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentials') 
    }
    //if user found create JWT 
    const authToken = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name}, authToken}) 
}

module.exports = {
    login,
    register
}