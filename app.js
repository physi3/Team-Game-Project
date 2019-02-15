require('dotenv').config();

const express      = require('express');
const bodyParser   = require('body-parser')
const cookieParser = require('cookie-parser');
const setLocals    = require('./middleware/set_locals');
const getHttps     = require('./middleware/https');

const db     = require('./modules/db');
const home   = require('./modules/home');
const signup = require('./modules/signup');
const login  = require('./modules/login');

var app = express();

app.set('view engine', 'ejs');

app.use(cookieParser()); // parsing cookies
app.use(bodyParser.urlencoded({extended: true})); // for parsing form-data
app.use(setLocals.setLocals); // set res.locals for ejs
app.use(express.static(__dirname + '/public')); // get public assets

app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/home', home.get);

app.get('/game', (req, res) => {
    res.render('game');
});

app.get('/login', login.get);
app.post('/login', login.post);

app.get('/signup', signup.get);
app.post('/signup', signup.post);

app.get('/signout', (req, res) => {
    res.clearCookie('key');
    res.redirect('back');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('app is running on port ' + port);
    let c = db.getPool(process.env.DATABASE_URL);
});

process.on('SIGTERM', () => {
    db.destroyPool(); // when heroku sends SIGTERM release all connections in the pool
});