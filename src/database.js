const knex = require('knex');

const { DATABASE_FILE } = require('./config');

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: '../' + DATABASE_FILE
    },
    useNullAsDefault: true
});

db.close = function() {
    const pool = Knex.client.pool;
    pool.drain(pool.destroyAllNow);
}

module.exports = db;