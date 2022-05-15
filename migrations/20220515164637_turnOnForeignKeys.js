
exports.up = function(knex) {
  return Promise.all([
    knex.raw(`
      PRAGMA foreign_keys = ON;
    `)
]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.raw(`
      PRAGMA foreign_keys = OFF;
    `)
]);
};