module.exports = { forceHttps };

function forceHttps(req, res, next) {
/*     if (!req.secure && req.hostname != 'localhost') {
        res.redirect('https://' + req.hostname + req.originalUrl);
    } */
    console.log(req.secure);
    console.log(req.protocol);
    console.log(req.connection.encrypted);
    next();
}