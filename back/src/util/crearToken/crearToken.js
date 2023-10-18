require("dotenv").config();
const jwt = require("jsonwebtoken");

const { TOKEN_KEY, TOKEN_EXPIRE_IN } = process.env;

const crearToken = async (
  tokenData,
  tokenKey = TOKEN_KEY,
  expiresIn = TOKEN_EXPIRE_IN
) => {
  try {
    const token = await jwt.sign(tokenData, tokenKey, {
      expiresIn,
    });

    return token;

  } catch (error) {
    throw error;
  }
};

module.exports = crearToken;