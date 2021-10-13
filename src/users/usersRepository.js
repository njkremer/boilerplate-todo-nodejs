const db = require('../database');

exports.findUserById = async function(id, isActive = true) {
  const users = await db('users').where({ id, isActive });
  return users[0];
}

exports.findUserByEmail = async function(email, isActive = true) {
  const users = await db('users').where({ email, isActive });
  return users[0];
}

exports.create = async function(user) {
  const createdUserId = (await db('users').insert(user))[0];

  user.id = createdUserId;
  delete user.password;

  return user;
}