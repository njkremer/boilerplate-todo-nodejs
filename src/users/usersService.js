const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_TOKEN_KEY } = require('../config');
const usersRepository = require('./usersRepository');

exports.findUserByEmail = async function (email) {
  return await usersRepository.findUserByEmail(email);
}

exports.register = async function (firstName, lastName, email, password) {
  let encryptedPassword = await bcrypt.hash(password, 10);

  const user = await usersRepository.create({
    firstName,
    lastName,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  const token = jwt.sign(
    {
      user_id: user.id,
      email
    },
    JWT_TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );

  user.token = token;

  return user;
}

exports.login = async function () {
  const user = await usersRepository.login();
  return user;
}