
exports.up = function(knex) {
  return Promise.all([
      knex.raw(`
        ALTER TABLE users
        ADD COLUMN is_active BIT DEFAULT 1
      `)
  ]);
};

exports.down = function(knex) {
    return new Promise(async (resolve, reject) => {
      try {
        const commands =
        [
          `
            CREATE TABLE users_old
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL
            );
          `,
          `
            INSERT INTO users_old
            SELECT id, email, password, first_name, last_name FROM users;
          `,
          `
            DROP TABLE users;
          `,
          `
            ALTER TABLE users_old RENAME TO users;
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
