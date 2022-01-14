
exports.up = function(knex) {
  return Promise.all([
      knex.raw(`
        ALTER TABLE list
        RENAME TO lists;
      `)
  ]);
};

exports.down = function(knex) {
    return Promise.all([
        knex.raw(`
          ALTER TABLE lists
          RENAME TO list;
        `)
    ]);
};
