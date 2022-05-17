const Item = require('../models/Item')
const Location = require('../models/Location')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

//get all items
const getAllItems = async (req, res) => {
    //get all items with find method
     const items = await Item.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({items})
} 

//get single item
const getItem = async (req, res) => {
    //destructure userId and item id from the user and id in url params respectively, renamed id to item id
    const {params:{id:itemId}} = req
    //get item from findOne method
    const item = await Item.findOne({
        _id: itemId
    })
    //if no item throw error
    if (!item) {
        throw new NotFoundError(`No item with id ${itemId}`)
    }
    res.status(StatusCodes.OK).json({item})
} 

//create item
const createItem = async (req, res) => {
    req.body.createdBy = req.user.userId
    const {name, quantity, price} = req.body
    let {locationId} = req.body
    //throw error if item, quantity, or price is left empty
    if (name === '' || quantity === '' || price === '') {
        throw new BadRequestError('Missing input field')
    }
    if (isNaN(req.body.price) && isNaN(req.body.quantity)) {
        throw new BadRequestError('Price and quantity must be a number')
    }
    if (isNaN(req.body.price)) {
        throw new BadRequestError('Price must be a number')
    }
    if (isNaN(req.body.quantity)) {
        throw new BadRequestError('Quantity must be a number')
    }
    if (req.body.quantity % 1 != 0) {
        throw new BadRequestError('Quantity must be a whole number')
    }

    // if no location entered set to default empty value
    if (locationId === '') {
        req.body.locationName = "---"
        req.body.locationId = "---"
    }
    else {
        //get location with locationId, set the name to the locationId
        const location = await Location.findOne({
            _id: locationId
        })
        req.body.locationName = location.name
    }
        //store price in db as decimal
        req.body.price = (parseFloat(req.body.price).toFixed(2));
        const item = await Item.create(req.body)
        res.status(StatusCodes.CREATED).json({item})
} 

//update item
const updateItem = async (req, res) => {
    //desctruc info from the request
    const {
        //rename item from body to item name
        body: {name, quantity, price, notes, locationId},
        user: {userId},
        params: {id: itemId},
    } = req
    //throw error if item, quantity, or price is left empty
    if (name === '' || quantity === '' || price === '') {
        throw new BadRequestError('Missing input field')
    }
    if (isNaN(price) && isNaN(quantity)) {
        throw new BadRequestError('Price and quantity must be a number')
    }
    if (isNaN(price)) {
        throw new BadRequestError('Price must be a number')
    }
    if (isNaN(quantity)) {
        throw new BadRequestError('Quantity must be a number')
    }
    if (req.body.quantity % 1 != 0) {
        throw new BadRequestError('Quantity must be a whole number')
    }
    
    if (req.body.locationId) {
        //get location with locationId, set the name to the locationId
        const location = await Location.findOne({
            _id: locationId
        })
        req.body.locationName = location.name
    }
    //store price in db as decimal
    req.body.price = (parseFloat(price).toFixed(2));

    //find item and update   
    const item = await Item.findOneAndUpdate({_id: itemId, createdBy:userId}, req.body, {new:true, runValidators: true})
        //if no item throw error
    if (!item) {
        throw new NotFoundError(`No item with id ${itemId}`)
    }
    res.status(StatusCodes.OK).json({item})
}

//delete item
const deleteItem = async (req, res) => {
       const {
        user: {userId},
        params: {id: itemId},
    } = req

    const item = await Item.findByIdAndRemove({
        _id:itemId,
        createdBy: userId
    })
    if (!item) {
        throw new NotFoundError(`No item with id ${itemId}`)
    }
    res.status(StatusCodes.OK).send()

} 


module.exports = {
    getAllItems,
    getItem,
    createItem,
    updateItem,
    deleteItem, 
}