const fs = require("fs");
const articleModel = require("../models/article.model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const uploadArticle = async (req, res) => {
  const { title, bannerImg, category, details, audiofile, description } =
    req.body;
  const token = req.headers?.authorization?.split(" ")[1];
  if (!title || !category) {
    return res.status(401).send({ message: "All fields are required !" });
  }
  if (!token) {
    return res.status(401).send({ message: "user not authenticated" });
  }
  try {
    const { _id } = jwt.verify(token ?? token, SECRET_KEY);
    const author = _id
    if (!author) {
      return res.status(401).send({ message: "user not authenticated!" });
    }
    await articleModel.create({
      title,
      bannerImg,
      category,
      author,
      details,
      audiofile,
      description,
    });
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
    let { author } = article
    const user = userModel.findOne({ author }, { _id: 0, password: 0 })
    res.status(200).send({ article: { ...article._doc, author: user._doc } });
  } catch (error) {
    return res.status(401).send({ message: error?.message });
  }
};

const getOneArticle = async function (req, res) {
  const { title } = req.params;
  if (!title) {
    return res.status(401).send({ message: "No specifications !" });
  }
  try {
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

const getRelated = async (req, res) => {
  const { category } = req.params
  if (!category) {
    return res.status(404).send("No category specified!")
  }
  try {
    const related = await articleModel.find({ category }).limit(6)
    return res.status(200).send(related)
  } catch (err) {
    res.status(500).send({ message: err?.message || "Internal Server error!" })
  }
}

module.exports = {
  allArticles,
  viewArticle,
  deleteArticle,
  uploadArticle,
  getOneArticle,
  getRelated
};
