const Location = require('../models/Location')
const Item = require('../models/Item')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

//get all locations
const getAllLocations = async (req, res) => {
    //get all locations with find method
     const locations = await Location.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({locations})
} 

const getLocationItems = async (req,res) => {
    //get all items for a certain location
    console.log(req.params.id)
    const items = await Item.find({createdBy:req.user.userId, locationId: req.params.id}).sort('createdAt')
    res.status(StatusCodes.OK).json({items})
}

//get single Location
const getLocation = async (req, res) => {
    //destructure userId and location id from the user and id in url params respectively, renamed id to location id
    const {params:{id:locationId}} = req
    //get location from findOne method
    const location = await Location.findOne({
        _id: locationId
    })
    //if no location throw error
    if (!location) {
        throw new NotFoundError(`No location with id ${locationId}`)
    }
    res.status(StatusCodes.OK).json({location})
} 

//create location
const createLocation = async (req, res) => {
    req.body.createdBy = req.user.userId
    const {name, address, phone} = req.body
    //throw error if name, address, or phone is left empty
    if (name === '' || address === '' || phone === '') {
        throw new BadRequestError('Missing input field')
    }
    if (isNaN(phone)) {
        throw new BadRequestError('Phone must be a number')
    }
    const location = await Location.create(req.body)
    res.status(StatusCodes.CREATED).json({location})
} 

//update location
const updateLocation = async (req, res) => {
    //desctruc info from the request
    const {
        //rename location from body to location name
        body: {name, address, phone},
        user: {userId},
        params: {id: locationId},
    } = req
    //throw error if name, address, or phone is left empty
    if (name === '' || address === '' || phone === '') {
        throw new BadRequestError('Missing input field')
    }
    //find location and update   
    const location = await Location.findOneAndUpdate({_id: locationId, createdBy:userId}, req.body, {new:true, runValidators: true})
    //if no location throw error
    if (!location) {
        throw new NotFoundError(`No location with id ${locationId}`)
    }
    res.status(StatusCodes.OK).json({location})
}

//delete location
const deleteLocation = async (req, res) => {
       const {
        user: {userId},
        params: {id: locationId},
    } = req
    //remove all items for this location
    await Item.deleteMany({
        locationId:locationId
    })
    const location = await Location.findByIdAndRemove({
        _id:locationId,
        createdBy: userId
    })
    console.log(location)
    if (!location) {
        throw new NotFoundError(`No location with id ${locationId}`)
    }
    res.status(StatusCodes.OK).send()

} 

module.exports = {
    getAllLocations,
    getLocationItems,
    getLocation,
    createLocation,
    updateLocation,
    deleteLocation, 
}