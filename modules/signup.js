module.exports = { get, post };

const { createUser, isUser } = require('./db');
const passwordValidator = require('password-validator');
const schema = new passwordValidator();

schema
.is().min(8)
.is().max(50)
.has().digits()
.has().not().spaces();

function get(req, res) {
    if (res.locals.logged_in) {
        res.redirect('back');
    } else {
        res.render('signup');
    }
}

async function post(req, res) {
    let errors = {
        username_error: '',
        password_error: '',
        password_check_error: ''
    };
    let username = req.body.username;
    let password = req.body.password;
    let password_check = req.body.password_check;

    if (!schema.validate(password)) {
        errors.password_error = 'Password does not meet requirements.';
    }

    if (password !== password_check) {
        errors.password_check_error = 'Passwords must match.';
    }

    if (!username) { errors.username_error = 'This is required.'; }
    if (!password) { errors.password_error = 'This is required.'; }
    if (!password_check) { errors.password_check_error = 'This is required.'; }

    if (await isUser(username).catch(console.error)) { errors.username_error = 'Username taken.'; }

    if (errors.username_error || errors.password_error || errors.password_check_error) {
        res.render('signup', {
            ...errors,
            ...req.body
        });
        return;
    }

    createUser(username, password)
    .then(res => {
        // Account made!
    }).catch(console.error);
    res.redirect('login');
}