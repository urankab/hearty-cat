const express = require('express')
const session = require('express-session')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

// MIDDLEWARES
app.use(cors())
app.use(bodyParser.json())

//IMPORT ROUTES
const postsRoute = require('./routes/posts')
const registerRoute = require('./routes/register')
const logInRoute = require('./routes/login')

app.use('/posts', postsRoute)
app.use('/register', registerRoute)
app.use('/login', logInRoute)

app.use(session({
    secret: 'cute cats',
    resave: true,
    saveUninitialized: false
}))

//ROUTES
app.get('/', (req, res) => {
    res.send('We are home!')
});

//CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('Connected to MongoDB')
);


//LISTEN TO SERVER
app.listen(3000)