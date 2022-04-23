
exports.up = function(knex) {
  return Promise.all([
      knex.raw(`
        ALTER TABLE lists
        ADD COLUMN owner_user_id INTEGER REFERENCES users(id)
      `)
  ]);
};

exports.down = function(knex) {
    return new Promise(async (resolve, reject) => {
      try {
        const commands =
        [
          `
            CREATE TABLE lists_old
            (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL
            );
          `,
          `
            INSERT INTO lists_old
            SELECT id, name from lists;
          `,
          `
            DROP TABLE lists;
          `,
          `
            ALTER TABLE lists_old RENAME TO lists;
          `
        ];

        for (const command of commands) {
          await knex.raw(command);
        }

        resolve();
      }
      catch (e) {
        console.log(e);
        reject();
      }
    });
};
