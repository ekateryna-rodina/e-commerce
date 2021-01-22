import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import orderRoutes from "./routes/orderRoutes.js";

// enable local variables
dotenv.config();

// connect db
connectDB();
// init express
const app = express();

// allow to accept json in the body
app.use(express.json());

// route for products
app.use("/api/products", productRoutes);

// route for user management
app.use("/api/users", userRoutes);

// route for orders
app.use("/api/orders", orderRoutes);

// handle 404 middleware
app.use(notFound);

// handle errors middleware
app.use(errorHandler);

// run server
const port = process.env.PORT || 5000;
app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${port}`.yellow.bold
  )
);
