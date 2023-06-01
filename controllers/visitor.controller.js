const Visitor = require("../models/visitor.model");
const { tokenCheck, createToken } = require("../utils/token");

async function incrementVisitorCount(req, res) {
  const now = new Date().toISOString();
  const [year, month] = now.split("-");
  const { page, token } = req.query;

  if (!page) return res.status(200).end();
  const { ok } = tokenCheck(token);
  if (ok) return res.status(200).send();
  console.log({ page, token });

  try {
    const item = await Visitor.findOne({ page, year, month });
    if (!item) {
      await Visitor.create({ page, year, month, number: 1 });
    } else if (item) {
      await Visitor.updateOne(
        { _id: item?._id },
        { $set: { number: parseInt(item?.number) + 1 } }
      );
    }
    const newToken = createToken(page);
    return res.status(200).send({ newToken });
  } catch (err) {
    console.log(err);
    res.send({ message: err?.message });
  }
}

async function getVisitorCount(req, res) {
  const { page } = req.params;
  try {
    const visits = (
      await Visitor.find({ page }, { id: 0, createdAt: 0, updatedAt: 0 })
    ).slice(-6);
    res.status(200).send({ visits });
  } catch (error) {
    res.send({ message: "Error" || error?.message });
  }
}

module.exports = { incrementVisitorCount, getVisitorCount };
