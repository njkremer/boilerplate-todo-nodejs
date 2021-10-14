const apiKeyService = require('../apiKey/apiKeyService');

const verifyApiKey = async (req, res, next) => {

  const apiKey = req.headers["api-key"];

  try {
    const isKeyvalid = await apiKeyService.isApiKeyValid(apiKey);

    req.isKeyvalid = isKeyvalid;
  } catch (err) {
    return res.status(403).json({message: "Invalid Api Key"});
  }
  return next();
};

module.exports = verifyApiKey;