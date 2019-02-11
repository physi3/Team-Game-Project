module.exports = { createPool, destroyPool, createUser, getUser, query }

const { Pool } = require('pg');
let pool;

const { genRandomString, getHash } = require('./security');

function createPool(db_url) {
    pool = new Pool({
        connectionString: db_url,
        ssl: true
    });
}

function destroyPool() {
    pool.end();
}

function query(q) {
    pool.query(q)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.error(err);
    });
}


function createUser(name, password) {
    let { hashed, salt } = getHash(password, genRandomString(16));
    pool.query(`INSERT INTO users (name, hash, salt) VALUES ('${name}', '${hashed}', '${salt}');`);
}

function getUser(name) {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM users WHERE name='${name}'`)
        .then(res => {
            if (res.rowCount != 1) {
                reject(new Error('User does not exist!'));
                return;
            }
            resolve(res.rows[0]);
            return;
        })
        .catch(err => reject);
    });
}