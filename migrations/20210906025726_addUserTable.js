
exports.up = function(knex) {
    return Promise.all([
        knex.raw(`
          CREATE TABLE users
          (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              email TEXT NOT NULL UNIQUE,
              password TEXT NOT NULL,
              firstName TEXT NOT NULL,
              lastName TEXT NOT NULL
          )
        `)
    ]);
  };

  exports.down = function(knex) {
      return Promise.all([
          knex.raw(`
            DROP TABLE users
          `)
      ]);
  };
