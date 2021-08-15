const knex = require('knex');

var path = require('path');
const { DATABASE_FILE } = require('./config');

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.join(__dirname, '../' + DATABASE_FILE),
        flags: ['OPEN_URI', 'OPEN_SHAREDCACHE']
    },
    seachPath: 'public',
    useNullAsDefault: true,
    // pool: {
    //     afterCreate:(conn, done) => {
    //         conn.open();
    //     }
    // }
});

db('sqlite_master').where('type', 'table').then((rows) => { console.log(rows); });
db.raw(`SELECT name FROM sqlite_master WHERE type='table'`).then((rows) => { console.log(rows); });

db.close = function() {
    const pool = Knex.client.pool;
    pool.drain(pool.destroyAllNow);
}

module.exports = db;