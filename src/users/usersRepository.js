const db = require('../database');

exports.findUserById = async function(id, isActive = true) {
  const user = (await db('users').where({ id, is_active: isActive }))[0];
  return [user].map(mapUserFromDb)[0];
}

exports.findUserByEmail = async function(email, isActive = true) {
  const user = (await db('users').where({ email, is_active: isActive }))[0];
  return [user].map(mapUserFromDb)[0];
}

exports.create = async function(user) {
  const record = [user].map(mapUserToDb)[0]
  const createdUserId = (await db('users').insert(record))[0];

  user.id = createdUserId;

  return user;
}

const mapUserFromDb = (userFromDb) => {
  if (userFromDb) {
    const { id, email, password, first_name, last_name, is_active } = userFromDb;

    return {
        id,
        email,
        password,
        firstName: first_name,
        lastName: last_name,
        isActive: is_active
    };
  }
}

const mapUserToDb = (user) => {
  if (user) {
    const { id, email, password, firstName, lastName, isActive } = user;

    return {
        id,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        is_active: isActive
    };
  }
}