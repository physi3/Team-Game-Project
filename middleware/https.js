module.exports = { getHttps };

function getHttps(req, res, next) {
    if (!req.secure) {
        res.redirect('https://' + req.hostname + req.baseUrl);
        console.log('https://' + req.hostname + req.baseUrl);
    }
    next();
}