const { verify } = require("jsonwebtoken");

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

const auth = async ({ headers: { authorization } }, res, next) => {
  const authHeader = authorization;
  const accessToken = authHeader && authHeader.split(" ")[1];
  try {
    const data = verify(accessToken, ACCESS_TOKEN);

    req.userData = data;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({
      ok: false,
      error: {
        message: "You are NOT authorized",
      },
    });
  }
};

module.exports = auth;
