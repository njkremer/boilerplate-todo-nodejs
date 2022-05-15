const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_TOKEN_KEY } = require('../config');
const usersRepository = require('./usersRepository');

exports.findUserById = async function (id) {
  const user = await usersRepository.findUserById(id);

  return cleanUser(user);
}

exports.findUserByEmail = async function (email) {
  const user = await usersRepository.findUserByEmail(email.toLowerCase());

  return cleanUser(user);
}

exports.register = async function (firstName, lastName, email, password) {
  let encryptedPassword = await bcrypt.hash(password, 10);

  const user = await usersRepository.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password: encryptedPassword,
    isActive: true
  });

  user.token = createJwt(user.id, email.toLowerCase());

  return cleanUser(user);
}

exports.login = async function (email, password) {

  const user = await usersRepository.findUserByEmail(email.toLowerCase());

  if (user && await bcrypt.compare(password, user.password)) {
    user.token = createJwt(user.id, email.toLowerCase());

    return cleanUser(user);
  }
}

const cleanUser = (user) => {
  if (user) {
    delete user.password;
  }
  return user;
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