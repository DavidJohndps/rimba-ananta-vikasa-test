const auth = async ({ userData }, res, next) => {
  const { role } = userData;
  if (role == 1) next();
  else
    res.status(400).json({
      ok: false,
      error: {
        message: "You are NOT authorized",
      },
    });
};

module.exports = auth;
