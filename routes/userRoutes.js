const express = require("express");
const {
  regForm,
  register,
  loginForm,
  login,
  product,
} = require("../controllers/userControllers");
const router = express.Router();

router.get("/register", regForm);
router.post("/register/user", register);
router.get("/login", loginForm);
router.post("/login/user", login);

module.exports = router;
