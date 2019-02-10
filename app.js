const express = require('express');
var app = express();

app.set('view engine', 'ejs');
var port = process.env.PORT || 8080; // either run globally or locally
app.use(express.static(__dirname + '/public')); // get assets

app.get('/', (req, res) => {
    res.render('home/index');
});

app.get('/game', (req, res) => {
    res.render('game/index');
});

app.listen(port, () => {
    console.log('app is running on port ' + port);
});