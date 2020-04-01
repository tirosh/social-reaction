-- id, first, last, email, passwd, bio, img

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS password_reset_codes;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL,
    last VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    psswd VARCHAR(255) NOT NULL,
    bio TEXT,
    img VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE password_reset_codes(
    id SERIAL PRIMARY KEY,
    code VARCHAR(255),
    email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);