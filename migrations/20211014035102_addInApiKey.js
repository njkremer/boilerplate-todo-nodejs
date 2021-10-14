
exports.up = function(knex) {
  return Promise.all([
      knex.raw(`
        CREATE TABLE api_key
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT NOT NULL UNIQUE
        )
      `)
  ]);
};

exports.down = function(knex) {
    return Promise.all([
        knex.raw(`
          DROP TABLE api_key
        `)
    ]);
};
