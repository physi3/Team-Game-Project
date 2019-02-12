module.exports = { genRandomString, getHash };

const { randomBytes, createHmac } = require('crypto');

function genRandomString(length) {
    return randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0, length);
}

function getHash(password, salt) {
    let hash = createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        hashed: value,
        salt  : salt
    };
}