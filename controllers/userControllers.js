const userModel = require("../models/userModels");
const productModel = require("../models/productModel");
const bcrypt = require("bcryptjs");

const regForm = (req, res) => {
  res.render("register");
};

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.render("error", { message: "Email already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await userModel.create({ email, password: hashPassword });

    res.status(200).redirect("/login");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render("error", { message: "Registration failed. Try again later." });
  }
};

const loginForm = (req, res) => {
  res.render("login");
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        req.session.email = email;
        res.status(200).redirect("/products");
      } else {
        res.render("error", { message: "Incorrect password" });
      }
    } else {
      res.render("error", { message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { message: "Server error" });
  }
};

module.exports = { regForm, register, loginForm, login };
