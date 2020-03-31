const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);
// require bcrypt for hashing passwords
const { hash, compare } = require("./bc");

// USER REGISTER ////////////////////
module.exports.registerUser = (first, last, email, psswd) => {
    const q = `
        INSERT INTO users (first, last, email, psswd)
        VALUES ($1, $2, $3, $4)
        RETURNING id`;
    return hash(psswd).then(hashdPsswd =>
        db.query(q, [first, last, email, hashdPsswd])
    );
};

// USER UPDATE //////////////////////
module.exports.updateUser = (...params) => {
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

// LOGIN ////////////////////////////
module.exports.login = (email, psswd) => {
    const q = `
        SELECT users.id, first, last, email
        FROM users
        WHERE email = $1`;

    return getPsswd(email)
        .then(dbData =>
            dbData.rows[0] === undefined
                ? Promise.reject(`Email doesn't exist.`)
                : dbData.rows[0].psswd
        )
        .then(hashdPsswd => compare(psswd, hashdPsswd))
        .then(match =>
            match ? db.query(q, [email]) : Promise.reject(`Wrong password.`)
        );
};

// PSSWD ////////////////////////////
const getPsswd = email => {
    const q = `SELECT psswd FROM users WHERE email = $1`;
    return db.query(q, [email]);
};
