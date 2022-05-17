const mongoose = require('mongoose')

const LocationSchema = mongoose.Schema({
    name: {
        type: String,
        required:[true, 'name'],
        maxlength: 50
    },
    address: {
        type: String,
        required:[true, 'address'],
        maxlength: 50
    },
    phone: {
        type: Number,
        required: [true, 'phone']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:[true]
    }

}, {timestamps: true})

module.exports = mongoose.model('Location', LocationSchema)