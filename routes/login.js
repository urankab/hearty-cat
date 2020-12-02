const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const Register = require('../models/Register')

// AUTHENTICATE INPUT AGAINST DATABASE
router.post('/', async (req, res) => {
    try {
        const user = await Register.findOne({ username: req.body.username }).exec()
        if (!user) {
            return res.status(400).send({ message: 'The username was not found.' })
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({message: 'The username and password combination was incorrect.'})
        }
        res.status(200).send({message: 'Login successful!'})
    } catch (err) {
        res.json({ message: err.message })
    }
})

module.exports = router;