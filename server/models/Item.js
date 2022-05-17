const mongoose = require('mongoose')

const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        required:[true, 'name'],
        maxlength: 50
    },
    quantity: {
        type: Number,
        required: [true, 'quantity'],
    },
    price: {
        type: Number,
        required: [true, 'price']
    },
    notes: {
        type: String,
        maxlength: 300
    },
    locationName: {
        type:String,
        required:[true],
        maxLength:50
    },
    locationId: {
        type:String,
        required:[true],
        maxLength:50
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:[true]
    }

}, {timestamps: true})

module.exports = mongoose.model('Item', ItemSchema)