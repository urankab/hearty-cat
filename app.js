const express = require('express')

const app = express();


//ROUTES
app.get('/', (req, res) => {
    res.send('We are home!')
});

app.get('/posts', (req, res) => {
    res.send('We are on posts!')
});


//LISTEN TO SERVER
app.listen(3000);