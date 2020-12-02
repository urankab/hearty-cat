const express = require('express')
const router = express.Router()
const User = require('../models/User')
const jwt = require("jsonwebtoken")
const { check, validationResult } = require("express-validator")
const auth = require('../middleware/auth')

// CREATE/POST NEW ACCOUNT
router.post('/register',
    // EXPRESS VALIDATOR
    [
        check('username', 'Username must be at least 6 characters.')
            .not()
            .isEmpty()
            .isLength({
                min: 6
            }),
        check('email', 'Please enter a valid e-mail address.').isEmail(),
        check('password', 'Password must be at least 6 characters.').isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errorFormatter = ({ msg }) => {
            return `${msg}`
        }
        const errors = validationResult(req).formatWith(errorFormatter)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const newAccount = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        })

        try {
            let checkUsername = await User.findOne({ username: newAccount.username })
            if (checkUsername) {
                return res.status(400).json({ message: 'Username already exists.' })
            }

            let checkEmail = await User.findOne({ email: newAccount.email })
            if (checkEmail) {
                return res.status(400).json({ message: 'E-mail already exists.' })
            }

            const savedAccount = await newAccount.save()

            // JWT 
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                'randomString', {
                expiresIn: 10000
            },
                (err, token) => {
                    if (err) throw err
                    res.status(200).json({
                        savedAccount,
                        message: 'Account created successfully!',
                        token
                    })
                }
            )
        }
        catch (err) {
            res.status(400).json({ message: err.message })
        }
    })

// AUTH USER
router.get('/auth', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id)
        res.status(400).json(user)
    }catch(err){
        console.log(err)
        res.status(400).json({message: 'Error in fetching user.'})
    }
})

// GET ALL ACCOUNTS
router.get('/', async (req, res) => {
    try {
        const accounts = await User.find()
        res.json(accounts)
    } catch (err) {
        res.json({ message: err.message })
    }
})

// DELETE ACCOUNT

// UPDATE ACCOUNT

module.exports = router;