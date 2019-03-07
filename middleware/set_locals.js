module.exports = { setLocals };

const { getCookie, getUser } = require('../modules/db');

async function setLocals(req, res, next) {
    res.locals.post = req.method == 'POST';
    
    if (!req.cookies['key']) {
        res.locals.logged_in = false; // if browser does not have cookie - not logged in
        next();
        return;
    }

    // if they have cookie check it
    await getCookie(false, req.cookies['key'])
        .then(re => {
            if (!re) { // the cookie is not in the db
                res.locals.logged_in = false;
                res.redirect('/signout');
                next();
            } else {
                res.locals.logged_in = true;
                res.locals.id = re.id;
            }
        })
        .catch(err => {
            res.locals.logged_in = false;
        });

    if (!res.locals.logged_in)  {next(); return; } // if not logged in there is no need to continue
    
    await getUser(false, res.locals.id)
    .then(re => {
        res.locals.username = re.name;
    })
    .catch(err => {
        res.locals.error = true;
    });

    next();
}