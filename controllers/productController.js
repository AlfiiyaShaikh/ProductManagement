const productModel = require("../models/productModel");

const product = async (req, res) => {
  if (!req.session.email) {
    return res.redirect("/login");
  }

  try {
    const products = await productModel.find();
    res.render("dashboard", {
      products,
      email: req.session.email,
      message: null,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).render("error", { message: "Failed to load products." });
  }
};

const addProduct = async (req, res) => {
  const { name, category, price, quantity, description } = req.body;
  try {
    await productModel.create({ name, category, price, quantity, description });
    const products = await productModel.find();
    res.render("dashboard", {
      products,
      email: req.session.email,
      message: "Product added successfully!",
    });
  } catch (error) {
    res.status(400).render("error", { message: "Error adding Product" });
  }
};

const editForm = async (req, res) => {
  const product = await productModel.findById(req.params.id);
  res.status(200).render("edit", { req, product: product });
};

const editProduct = async (req, res) => {
  const id = req.params.id;
  const { name, category, price, quantity, description } = req.body;
  try {
    await productModel.findByIdAndUpdate(id, {
      name: name,
      category: category,
      price: price,
      quantity: quantity,
      description: description,
    });
    const products = await productModel.find();
    res.render("dashboard", {
      products,
      email: req.session.email,
      message: "Product updated successfully!",
    });
  } catch (error) {
    res.status(400).render("error", { message: "Error adding Product" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await productModel.findByIdAndDelete(id);
    const products = await productModel.find();
    res.render("dashboard", {
      products,
      email: req.session.email,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    res.status(400).render("error", { message: "Error adding Product" });
  }
};

const searchProduct = async (req, res) => {
  const { search } = req.query;

  try {
    const products = await productModel.find({
      $or: [
        {
          name: { $regex: search, $options: "i" },
        },
        { category: { $regex: search, $options: "i" } },
      ],
    });

    res.render("dashboard", {
      products,
      email: req.session.email,
      message: products.length === 0 ? "No result found" : null,
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).render("error", { message: "Search error" });
  }
};

module.exports = {
  addProduct,
  deleteProduct,
  product,
  editForm,
  editProduct,
  searchProduct,
};
