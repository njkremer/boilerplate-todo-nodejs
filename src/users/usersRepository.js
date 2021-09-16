const db = require('../database');

exports.findUserById = async function(id) {
  const users = await db('users').where({ id });
  return users[0];
}

exports.findUserByEmail = async function(email) {
  const users = await db('users').where({ email });
  return users[0];
}

exports.create = async function(user) {
  const createdUserId = (await db('users').insert(user))[0];

  user.id = createdUserId;
  delete user.password;

  return user;
}

exports.login = async function() {
  const rows = await db.select().table('list');
  return rows;
}