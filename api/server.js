import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import colors from "colors";

// enable local variables
dotenv.config();

// connect db
connectDB();
// init express
const app = express();

// route for products
app.use("/api/products", productRoutes);

// run server
const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${port}`.yellow.bold
  )
);
