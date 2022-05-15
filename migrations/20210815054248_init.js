
exports.up = function(knex) {
  return Promise.all([
      knex.raw(`
          CREATE TABLE users
          (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              email TEXT NOT NULL UNIQUE,
              password TEXT NOT NULL,
              first_name TEXT NOT NULL,
              last_name TEXT NOT NULL,
              is_active BIT DEFAULT 1
          )
      `),
      knex.raw(`
        CREATE TABLE lists
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            owner_user_id INTEGER,
            FOREIGN KEY(owner_user_id) REFERENCES users(id)
        )
      `)
  ]);
};

exports.down = function(knex) {
    return Promise.all([
        knex.raw(`
          DROP TABLE lists
        `),
        knex.raw(`
          DROP TABLE users
        `)
    ]);
};
