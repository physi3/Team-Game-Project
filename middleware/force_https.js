module.exports = { forceHttps };

function forceHttps(req, res, next) {
    if (!req.secure && req.hostname != 'localhost') {
        console.log('https://' + req.subdomains[0] + req.hostname + req.originalUrl)
        console.log('https://' + req.hostname + req.originalUrl)
        res.redirect('https://' + req.hostname + req.originalUrl);
    }
    next();
}