const spicedPg = require('spiced-pg');
const db = spicedPg(
    process.env.DATABASE_URL ||
        'postgres:postgres:postgres@localhost:5432/socialnetwork'
);
// require bcrypt for hashing passwords
const { hash } = require('../utils/bc');

exports.registerUser = async (first, last, email, hashdPsswd) => {
    const q = `
        INSERT INTO users (first, last, email, psswd)
        VALUES ($1, $2, $3, $4)
        RETURNING id`;
    const dbData = await db.query(q, [first, last, email, hashdPsswd]);
    return dbData.rows[0].id;
};

exports.getUser = async email => {
    const q = `
        SELECT first, last, email, img_url, bio
        FROM users
        WHERE email = $1`;
    const dbData = await db.query(q, [email]);
    return dbData.rows.length === 0
        ? Promise.reject(`${email} could not be found.`)
        : dbData.rows[0];
};

exports.setImage = (id, img_url) => {
    const q = `
        UPDATE users
        SET img_url=$2
        WHERE id=$1
        RETURNING img_url`;
    return db.query(q, [id, img_url]);
};

exports.setBio = (id, bio) => {
    const q = `
        UPDATE users
        SET bio=$2
        WHERE id=$1
        RETURNING bio`;
    return db.query(q, [id, bio]);
};

exports.setResetCode = (email, code) => {
    const q = `
        INSERT INTO password_reset_codes (email, code)
        VALUES ($1, $2)`;
    return db.query(q, [email, code]);
};

exports.getResetCode = email => {
    const q = `
        SELECT code
        FROM password_reset_codes
        WHERE email = $1 
        AND CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
        ORDER BY created_at DESC
        LIMIT 1`;
    return db.query(q, [email]);
};

exports.updatePsswd = (email, psswd) => {
    const q = `
        UPDATE users
        SET psswd=$2
        WHERE email=$1`;
    return hash(psswd).then(hashdPsswd => db.query(q, [email, hashdPsswd]));
};

exports.updateUser = (...params) => {
    const str = params[4] === '' ? params.splice(4) : ', psswd=$5';
    const q = `
        UPDATE users
        SET first=$2, last=$3, email=$4 ${str}
        WHERE id=$1`;
    return params[4] === undefined
        ? db.query(q, params)
        : hash(params[4]).then(hashdPsswd => {
              params[4] = hashdPsswd;
              return db.query(q, params);
          });
};

exports.getId = async email => {
    const q = `SELECT id FROM users WHERE email = $1`;
    const dbData = await db.query(q, [email]);
    return dbData.rows.length === 0
        ? Promise.reject(`${email} could not be found.`)
        : dbData.rows[0].id;
};

exports.getPsswd = async email => {
    const q = `SELECT psswd FROM users WHERE email = $1`;
    const dbData = await db.query(q, [email]);
    return dbData.rows.length === 0
        ? Promise.reject(`${email} could not be found.`)
        : dbData.rows[0].psswd;
};