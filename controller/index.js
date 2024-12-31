const express = require("express");
const {
  notifyOneClickOrder,
  notifyQuestion,
  notifyOrder,
  notifyReview,
  notifyNewPrice,
  notifyNewProduct,
} = require("../service");
const checkHash = require("../middleware/checkHash");

const router = express.Router();

router.post("/question", checkHash, notifyQuestion);
router.post("/order", checkHash, notifyOrder);
router.post("/order/oneClick", checkHash, notifyOneClickOrder);
router.post("/review", checkHash, notifyReview);
router.post("/new-price", checkHash, notifyNewPrice);
router.post("/new-product", checkHash, notifyNewProduct);

module.exports = router;
