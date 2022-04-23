
exports.up = function(knex) {
  return Promise.all([
      knex.raw(`
        CREATE TABLE list_items
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            note TEXT,
            due_date TEXT
        )
      `)
  ]);
};

exports.down = function(knex) {
    return Promise.all([
        knex.raw(`
          DROP TABLE list_items
        `)
    ]);
};
