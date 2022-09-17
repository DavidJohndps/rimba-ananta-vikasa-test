const Router = require("express").Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer({dest: 'product_image'});

const auth = require("../Middleware/Authenticate");
const isAdmin = require("../Middleware/isAdmin");
const Product = require("../Models/Product");

Router.get("/", [auth, isAdmin], async (req, res) => {
  try {
    const docs = await Product.find();

    res.status(200).json({
      ok: true,
      product: docs,
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

Router.post("/", [auth, isAdmin, upload.array('image', 10)], async ({ body: { input } }, res) => {
  try {
    const docs = await Product.create({ ...input });

    res.status(200).json({
      ok: true,
      product: docs,
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

Router.post("/update", [auth, isAdmin, upload.array('image', 10)], async ({ body: { input } }, res) => {
  try {
    const { id } = input;
    const doc = await Product.findById(id);

    Object.keys(input).map((key) => {
      doc[key] = input[key];
    });
    const result = await doc.save();

    res.status(200).json({
      ok: true,
      product: result,
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

Router.delete("/", [auth, isAdmin], async ({ body: { input } }, res) => {
  try {
    const {id, image} = input
    // const docs = await Product.findByIdAndDelete(id);

    for (img of image) {
      console.log(img)
      // await fs.unlink(`product_image/${img}`)
    }

    res.status(200).json({
      ok: true,
      product: docs,
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