module.exports = { getPool, destroyPool, createUser, isUser, getCookie, setCookie, getCookieByCookie }

const { Pool } = require('pg');
let pool;

const { genRandomString, getHash } = require('./security');

function getPool(db_url) { // create pool or return it if it already exists
    if (!pool) {
        pool = new Pool({
            connectionString: db_url,
            ssl: true
        });
        console.log('created pool!');
    }
    return pool;
}

function destroyPool() { // release all connections in the pool 
    pool.end();
    console.log('Pool ended.');
}

function createUser(name, password) {
    return new Promise((resolve, reject) => {
        isUser(name).then(res => {
            reject(new Error('User already exists.'));
            return;
        }).catch(reject);
        let { hashed, salt } = getHash(password, genRandomString(16));
        pool.query(`INSERT INTO users (name, hash, salt) VALUES ('${name}', '${hashed}', '${salt}');`)
        .then(resolve(true))
        .catch(reject);
    });
}

function isUser(name) {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM users WHERE name='${name}'`)
        .then(res => {
            if (res.rows == []) {
                resolve(false);
                return;
            }
            resolve(res.rows[0]);
            return;
        })
        .catch(err => {
            reject(err);
            return;
        });
    });
}

function getCookie(id) {
    return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM user_cookies WHERE id='${id}';`)
        .then(res => {
            if (res.rowCount == 0) { resolve(false); return; }
            resolve(res.rows[0].key);
        }).catch(reject);
    });
}

async function setCookie(id, code) {
    return new Promise((resolve, reject) => {
        getCookie(id).then(res => {
            if (!res) {
                pool.query(`INSERT INTO user_cookies (id, key) VALUES ('${id}', '${code}');`)
                .then(res => {
                    resolve(true);
                }).catch(reject);
            } else {
                pool.query(`UPDATE user_cookies SET key='${code}' WHERE id='${id}';
                `).then(res => {
                    resolve(true);
                }).catch(reject);
            }
        })
    });
}

function getCookieByCookie(cookie) {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM user_cookies WHERE key='${cookie}';`)
        .then(res => {
            if (res.rowCount == 0) { resolve(false); return; }
            resolve(res.rows[0]);
        }).catch(reject);
    });
}