const express = require('express')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv/config');


// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

//IMPORT ROUTES
const postsRoute = require('./routes/posts')

app.use('/posts', postsRoute);

//ROUTES
app.get('/', (req, res) => {
    res.send('We are home!');
});

//CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('Connected to MongoDB')
);


//LISTEN TO SERVER
app.listen(3000);