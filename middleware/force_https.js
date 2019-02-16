module.exports = { forceHttps };

function forceHttps(req, res, next) {
    if (!req.secure && req.hostname != 'localhost') {
        res.redirect('https://' + req.subdomains[0] + req.hostname + req.originalUrl);
    }
    next();
}