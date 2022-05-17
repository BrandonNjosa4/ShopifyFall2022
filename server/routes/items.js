const express = require('express')
const router = express.Router()

const {     
    getAllItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
} = require('../controllers/items')

router.route('/api/items').get(getAllItems)
router.route('/api/add-item').post(createItem)
router.route('/api/:id').get(getItem).delete(deleteItem).put(updateItem)

module.exports = router


    