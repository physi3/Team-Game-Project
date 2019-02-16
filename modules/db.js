module.exports = {
    getPool,
    destroyPool,

    createUser,
    getUser,

    setCookie,
    getCookie
}

const { Pool } = require('pg');
let pool;

const { genRandomString, getHash } = require('./security');

//              MAKE / DESTROY------

function getPool(db_url) { // create pool or return it if it already exists
    if (!pool) {
        pool = new Pool({
            connectionString: db_url,
            ssl: true
        });
        console.log('Pool ready!');
    }
    return pool;
}

function destroyPool() { // release all connections in the pool 
    pool.end();
    console.log('Pool ended.');
}

//              USER------

function createUser(name, password) { // creates a user by username + password, resolve true
    return new Promise((resolve, reject) => {
        getUser(true, name).then(res => {
            if (res) {
                reject(new Error('User already exists.'));
                return;
            }
        }).catch(reject);

        let { hashed, salt } = getHash(password, genRandomString(16)); // generate random salt and create hash
        pool.query(`INSERT INTO users (name, hash, salt) VALUES ('${name}', '${hashed}', '${salt}');`)
        .then(resolve(true))
        .catch(reject);
    });
}

function getUser(byName, input) { // get user row by username or id, resolve false / row
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM users WHERE ${byName ? 'name' : 'id'}='${input}';`)
        .then(res => {
            resolve(res.rowCount == 0 ? false : res.rows[0]);
        })
        .catch(reject);
    });
}

//              COOKIE------

async function setCookie(id, code) { // sets a cookie by id, resolve true
    return new Promise((resolve, reject) => {
        getCookie(true, id)
        .then(res => {
            let query = `${res ? 'UPDATE' : 'INSERT INTO'} user_cookies ${res ? `SET key='${code}' WHERE id='${id}'` : `(id, key) VALUES ('${id}', '${code}')`};`;
            pool.query(query)
                .then(resolve(true))
                .catch(reject);
        });
    });
}

function getCookie(byId, input) { // get a cookie by id, resolve false / data
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM user_cookies WHERE ${byId ? 'id' : 'key'}='${input}';`)
        .then(res => {
            resolve(res.rowCount == 0 ? false : res.rows[0]);
        }).catch(reject);
    });
}