const apiKeyRepository = require('./apiKeyRepository');

exports.isApiKeyValid = async function (key) {
  const foundKey = await apiKeyRepository.findKey(key);
  return !!foundKey;
}
