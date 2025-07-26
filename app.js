const connectDb = require("./config/db.js");

const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");

const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes.js");

const app = express();
app.set("view engine", "ejs");

connectDb();

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "product",
    saveUninitialized: false,
    resave: false,
  })
);

app.use("/", userRouter);
app.use("/products", productRouter);

app.listen(4000, () => {
  console.log("running");
});
