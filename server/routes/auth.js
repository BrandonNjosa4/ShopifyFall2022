const express = require('express')
const router = express.Router()

const { login, register } = require('../controllers/auth')

router.route('/api/login').post(login)
router.route('/api/register').post(register)

module.exports = router