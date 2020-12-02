const express = require('express')
const router = express.Router()
const Register = require('../models/Register')
const bcrypt = require('bcrypt')

// CREATE/POST NEW ACCOUNT
router.post('/', async (req, res) => {
    const newAccount = new Register({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    try {
        const savedAccount = await newAccount.save()
        res.json(savedAccount)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// GET ACCOUNTS
router.get('/all', async (req, res)=>{
    try{
        const accounts = await Register.find()
        res.json(accounts)
    } catch(err){
        res.json({message: err.message})
    }
})

// DELETE ACCOUNT

// UPDATE ACCOUNT

module.exports = router;