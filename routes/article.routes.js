const { Router } = require("express");
const {
  uploadArticle,
  allArticles,
  viewArticle,
  deleteArticle,
  getOneArticle,
  getRelated,
} = require("../controllers/article.controller");

const router = Router();

router.post("/upload", uploadArticle);
router.get("/:title", viewArticle);
router.get("/find/:title", getOneArticle);
router.get("/category/:category", getRelated);
router.post("/delete/:title", deleteArticle);
router.get("/", allArticles);

module.exports = router;
