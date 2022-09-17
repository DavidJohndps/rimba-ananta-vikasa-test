const Router = require("express").Router();

const Product = require("../Models/Product");

Router.get("/", async (req, res) => {
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

Router.post("/", async ({ body: {input} }, res) => {
  try {
    console.log('hit')
    const docs = await Product.find({ name: { $regex: input, $options: "i" } });

    console.log(typeof docs)

    res.status(200).json({
      ok: true,
      product: docs,
    });
  } catch ({ error: { message } }) {
    console.log(message);
    res.status(500).json({
      ok: false,
      error: {
        message,
      },
    });
  }
});

module.exports = Router