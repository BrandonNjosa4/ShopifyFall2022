const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = (req,res,next) => {
    console.log(req.headers)
    //check the header
    const authHeader = req.headers.authorization
    //throw error is no header or invalid header
    if(!authHeader){
        throw new UnauthenticatedError('Authentication invalid 1')
    }
    //split token from bearer
    const token = authHeader.split(' ')[1]
    try {
        //get payload
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        //attach the user to the items routes, passing on the payload
        req.user = {userId: payload.userId, name: payload.name}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
}

module.exports = auth 