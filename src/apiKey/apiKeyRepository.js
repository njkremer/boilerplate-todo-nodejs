const db = require('../database');

exports.findKey = async function(key) {
  const foundKey = await db('api_key').where({ key });
  return foundKey[0];
}