const Router = require("express").Router();
const Crypto = require("crypto-js");
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "user_image" });
const User = require("../Models/User");

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET;
const SECRET_KEY = process.env.SECRET_KEY;

const auth = require("../Middleware/Authenticate");
const isAdmin = require("../Middleware/isAdmin");

Router.get("/login", async ({ body: { input } }, res) => {
  const { email, password } = input;
  const user = await User.findOne({ email: email });

  const decryptedPassword = Crypto.AES.decrypt(
    user.password,
    SECRET_KEY
  ).toString(Crypto.enc.Utf8);

  if (password !== decryptedPassword)
    throw new ApolloError("Wrong Password", 403);

  const accessToken = sign({ userData: user }, ACCESS_TOKEN, {
    expiresIn: "2h",
  });

  res.cookie("accessToken", accessToken, { expires: setExpires(60) });

  res.status(200).json({
    ok: true,
    user: [Object.assign(user, { accessToken: accessToken })],
  });
});

Router.get("/profile", auth, async ({ body: { id } }, res) => {
  try {
    const docs = await User.findById(id);

    res.status(200).json({
      ok: true,
      user: docs,
    });
  } catch ({ error }) {
    console.log(error);
    res.status(400).json({
      ok: false,
      error: {
        message,
      },
    });
  }
});

Router.post(
  "/",
  [auth, isAdmin, upload.single("ktp")],
  async ({ body: { input }, file }, res) => {
    try {
      const { password, ...userInput } = input;
      password = Crypto.AES.encrypt(password, SECRET_KEY).toString();
      const filename = file.filename
      const docs = await Product.create({ password, filename ,...userInput });

      res.status(200).json({
        ok: true,
        user: docs,
      });
    } catch ({ error: { message } }) {
      res.status(400).json({
        ok: false,
        error: {
          message,
        },
      });
    }
  }
);

Router.post(
  "/update",
  [auth, upload.single("ktp")],
  async ({ body: { input }, file }, res) => {
    try {
      const { id } = input;
      const doc = await User.findById(id);

      Object.keys(input).map((key) => {
        doc[key] = input[key];
      });
      doc["ktp"] = file.filename;
      const result = await doc.save();

      res.status(200).json({
        ok: true,
        user: result,
      });
    } catch ({ error: { message } }) {
      res.status(400).json({
        ok: false,
        error: {
          message,
        },
      });
    }
  }
);

Router.delete("/", [auth, isAdmin], async ({ body: { id, ktp } }, res) => {
  try {
    const docs = await User.findByIdAndDelete(id);

    await fs.unlink(`user_image/${ktp}`);

    res.status(200).json({
      ok: true,
      user: docs,
    });
  } catch ({ error: { message } }) {
    res.status(400).json({
      ok: false,
      error: {
        message,
      },
    });
  }
});

module.exports = Router