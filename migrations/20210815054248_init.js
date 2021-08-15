
exports.up = function(knex) {
  return Promise.all([
      knex.raw(`
        CREATE TABLE list
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
      `)
  ]);
};

exports.down = function(knex) {
    return Promise.all([
        knex.raw(`
          DROP TABLE list
        `)
    ]);
};
