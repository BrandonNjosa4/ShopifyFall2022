const express = require('express')
const router = express.Router()

const {     
    getAllLocations,
    getLocationItems,
    getLocation,
    createLocation,
    updateLocation,
    deleteLocation, 
} = require('../controllers/location')

router.route('/api/locations').get(getAllLocations)
router.route('/api/add-location').post(createLocation)
router.route('/api/:id').get(getLocation).delete(deleteLocation).put(updateLocation)
router.route('/api/items/:id').get(getLocationItems)

module.exports = router