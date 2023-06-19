const { Router } = require("express");
const {
  uploadArticle,
  allArticles,
  viewArticle,
  deleteArticle,
} = require("../controllers/article.controller");

const router = Router();

router.post("/upload", uploadArticle);
router.get("/view/:title", viewArticle);
router.get("/delete/:title", deleteArticle);
router.post("/", allArticles);

module.exports = router;
