require('dotenv').config();
const express = require('express');
var app = express();

const db = require('./modules/db');

app.set('view engine', 'ejs');
var port = process.env.PORT || 8080; // either run by given port (heroku) or locally on 8080
app.use(express.static(__dirname + '/public')); // get assets

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/game', (req, res) => {
    res.render('game');
});

app.listen(port, () => {
    console.log('app is running on port ' + port);
    db.createPool();
});

process.on('SIGTERM', () => {
    //destroyPool();
});
