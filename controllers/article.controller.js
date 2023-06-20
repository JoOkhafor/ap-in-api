const fs = require("fs");
const articleModel = require("../models/article.model");

const uploadArticle = async (req, res) => {
  const { title, bannerImg, category, author, details } = req.body;
  if (!title || !bannerImg || !author || !details) {
    return res.status(401).send({ message: "No content provided !" });
  }
  try {
    await articleModel.create({ title, bannerImg, category, author, details });
    res.status(200).send({ message: "success!" });
  } catch (error) {
    return res.status(401).send({ message: error?.message });
  }
};

const viewArticle = async function (req, res) {
  const { title } = req.params;
  if (!title) {
    return res.status(401).send({ message: "No specifications !" });
  }
  try {
    const update = await articleModel.findOne({ title });
    if (update) {
      await articleModel.updateOne({ title }, { views: update?.views + 1 });
    }
    const article = await articleModel.findOne({ title }, { _id: 0 });
    if (!article) {
      return res.status(404).send({ message: "Not found!" });
    }
    res.status(200).send({ article });
  } catch (error) {
    return res.status(401).send({ message: error?.message });
  }
};

const deleteArticle = async function (req, res) {
  const { title } = req.params;
  let errorr;
  if (!title) {
    return res.status(401).send({ message: "No specifications !" });
  }
  try {
    const article = await articleModel.findOneAndDelete({ title });
    if (!article) {
      return res.status(404).send({ message: "Not found!" });
    }
    fs.unlink(`uploads/pictures/${article?.bannerImg}`, (err) => {
      if (err) errorr = err?.message;
    });
    res.status(200).send({ message: errorr || "Success" });
  } catch (error) {
    return res.status(401).send({ message: error?.message });
  }
};

const allArticles = async function (req, res) {
  try {
    const articles = await articleModel.find();
    if (!articles) {
      return res.status(404).send({ message: "Not found!" });
    }
    res.status(200).send(articles);
  } catch (error) {
    return res.status(401).send({ message: error?.message });
  }
};

module.exports = { allArticles, viewArticle, deleteArticle, uploadArticle };
