const express = require("express");
const {
  product,
  addProduct,
  deleteProduct,
  editForm,
  editProduct,
  searchProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", product);

router.post("/create", addProduct);

router.get("/edit/:id", editForm);

router.get("/search", searchProduct);

router.patch("/edit/:id", editProduct);

router.delete("/delete/:id", deleteProduct);

module.exports = router;
