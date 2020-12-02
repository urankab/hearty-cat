const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const User = require('../models/User')
const { check, validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")

// AUTHENTICATE INPUT AGAINST DATABASE
router.post('/',
    [
        check('username', 'Username must be 6 characters long.').isLength({
            min: 6
        }),
        check('password', 'Password must be 6 characters long.').isLength({
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
        try {
            const user = await User.findOne({ username: req.body.username }).exec()
            if (!user) {
                return res.status(400).send({ message: 'The username was not found.' })
            }
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(400).send({ message: 'The username and password combination was incorrect.' })
            }

            // JWT
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                "randomString",
                {
                    expiresIn: 3600
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        user,
                        message: 'Login successful!',
                        token
                    });
                }
            )

        } catch (err) {
            res.json({ message: err.message })
        }
    }
)

module.exports = router;