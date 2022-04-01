const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_TOKEN_KEY } = require('../config');
const usersRepository = require('./usersRepository');

exports.findUserById = async function (id) {
  const user = await usersRepository.findUserById(id);
  if (user) {
    delete user.password;
  }

  return user;
}

exports.findUserByEmail = async function (email, cleanPassword = true) {
  const user = await usersRepository.findUserByEmail(email);

  if (user && cleanPassword) {
    delete user.password;
  }

  return user;
}

exports.register = async function (firstName, lastName, email, password) {
  let encryptedPassword = await bcrypt.hash(password, 10);

  const user = await usersRepository.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  user.token = createJwt(user.id, email);

  return user;
}

exports.login = async function (email, password) {

  const user = await exports.findUserByEmail(email, false);
  if (user && await bcrypt.compare(password, user.password)) {
    user.token = createJwt(user.id, email);

    delete user.password;

    return user;
  }
}

const createJwt = (userId, email) => {
  const token = jwt.sign(
    {
      user_id: userId,
      email
    },
    JWT_TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );

  return token;
}