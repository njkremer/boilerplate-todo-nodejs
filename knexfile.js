const { DATABASE_FILE } = require('./src/config');

module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: DATABASE_FILE
        },
        seachPath: 'public',
        migrations: {
            tableName: 'migrations'
        },
        useNullAsDefault: true
    }
}