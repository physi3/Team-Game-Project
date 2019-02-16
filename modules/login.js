module.exports = { get, post };

const { getUser, setCookie } = require('./db');
const { getHash, genRandomString } = require('./security');

function get(req, res) {
    if (res.locals.logged_in) {
        res.redirect('back');
    } else {
        res.render('login');
    }
}

async function post(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    let username_error = '';
    let password_error = '';

    if (!username) { username_error = 'This is required.'; }
    if (!password) { password_error = 'This is required.'; }

    let auth = false;

    if (username_error == '') {
        var user = await getUser(true, username).catch(err => {
            console.error(err);
            username_error = 'Could\'t get user.';
        });
        if (user == undefined) { username_error = 'That user does not exist.'; }
        else {
            if (user.hash === getHash(password, user.salt).hashed) {
                auth = true;
            } else {
                password_error = 'Incorrect password.';
            }
        }
    }

    if (!auth) { // failed to login
        res.render('login', {
            username_error,
            password_error,
            ...req.body
        });
        return;
    }
    // ↓ The user has successfully signed in ↓

    // now set cookie key
    let cookie = user.id + genRandomString(40);
    setCookie(user.id, cookie).then(a => {
        res.cookie('key', cookie, {
            maxAge: 432000000 // 5 days
        });
    }).catch(console.error)
    .finally(() => {
        res.redirect('home');
    });
}