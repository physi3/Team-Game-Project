module.exports = { setLocals };

const { getCookieByCookie } = require('../modules/db');

function setLocals(req, res, next) {
    res.locals.post = req.method == 'POST';
    
    if (!req.cookies['key']) {
        res.locals.logged_in = false; // if browser does not have cookie - not logged in
        next();
        return;
    }

    // if they have cookie check it
    getCookieByCookie(req.cookies['key'])
        .then(re => {
            if (!re) { // the cookie is not in the db
                res.locals.logged_in = false;
            } else {
                res.locals.logged_in = true;
            }
        })
        .catch(err => {
            res.locals.logged_in = false;
        }).finally(() => {
            next();
        });
}