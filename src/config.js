const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT || 4000,
    DATABASE_FILE: process.env.DATABASE_FILE  || 'list.sqlite',
    JWT_TOKEN_KEY: process.env.JWT_TOKEN_KEY  || null,
}