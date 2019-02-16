module.exports = { forceHttps };

function forceHttps(req, res, next) {
    if (!req.secure && req.hostname != 'localhost') {
        console.log(req.hostname + req.originalUrl);
        res.redirect(req.hostname + req.originalUrl);
    }
    next();
}