const apiKeyService = require('../apiKey/apiKeyService');

const verifyApiKey = async (req, res, next) => {

  const apiKey = req.headers["api-key"];

  try {
    const isKeyValid = await apiKeyService.isApiKeyValid(apiKey);
    if (isKeyValid === false) {
      return res.status(403).json({message: "Invalid Api Key"});
    }
  } catch (err) {
    return res.status(403).json({message: "Invalid Api Key"});
  }
  return next();
};

module.exports = verifyApiKey;