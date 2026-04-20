const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/user/user.routes");
const restaurantRoutes = require("./modules/Restaurant/restaurant.route");
const foodRoutes = require("./modules/food/food.routes");
const restaurantFoodRoutes = require("./modules/food/restaurant.food.routes");
const orderRoutes = require("./modules/order/order.routes");
const restaurantOrderRoutes = require("./modules/order/restaurant.order.routes");
const { errorHandler, notFound } = require("./middleware/error.middleware");

const app = express();

// ── Core Middleware ──────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

// ── Routes ───────────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/restaurants/foods", restaurantFoodRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/restaurants/orders", restaurantOrderRoutes);

// ── Error Handling ────────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
