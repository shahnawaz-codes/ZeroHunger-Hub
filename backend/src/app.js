const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/user/user.routes");
const restaurantRoutes = require("./modules/Restaurant/restaurant.route");
const bagRoutes = require("./modules/bag/bag.routes");
const restaurantBagRoutes = require("./modules/bag/restaurant.bag.routes");
const orderRoutes = require("./modules/order/order.routes");
const restaurantOrderRoutes = require("./modules/order/restaurant.order.routes");
const { errorHandler, notFound } = require("./middleware/error.middleware");

/**
 * Express application instance for the ZeroHunger API.
 *
 * Sets up middleware stack, routes, and error handling for the API server.
 * All environment variables should be loaded before this module is imported.
 *
 * @type {Express.Application}
 */
const app = express();

// ── Core Middleware ───────────────────────────────────────────────────────────────
/**
 * CORS Configuration - allows requests from frontend CLIENT_URL
 * Enables credentials (cookies, authorization headers)
 */
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

/**
 * Cookie parser - parses Cookie header and populates req.cookies
 */
app.use(cookieParser());

/**
 * JSON body parser - parses application/json bodies
 * Limit set to 10mb for file uploads
 */
app.use(express.json({ limit: "10mb" }));

/**
 * URL-encoded parser - parses application/x-www-form-urlencoded bodies
 */
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/**
 * Morgan HTTP request logger - logs requests in development environment only
 * Helps debug API requests and response times
 */
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

// ── Routes ────────────────────────────────────────────────────────────────────────

/**
 * Health check endpoint - returns ok status
 * Used to verify server is running
 *
 * GET /api/health
 * Response: { status: "ok" }
 */
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

/**
 * Authentication routes - handles registration, login, verification
 * Routes:
 * - POST   /api/auth/register
 * - POST   /api/auth/login
 * - POST   /api/auth/logout
 * - POST   /api/auth/verify-email
 * - POST   /api/auth/resend-otp
 */
app.use("/api/auth", authRoutes);

/**
 * User routes - handles user profile and account management
 * Routes:
 * - GET    /api/users/me
 * - PATCH  /api/users/me
 * - DELETE /api/users/me
 */
app.use("/api/users", userRoutes);

/**
 * Restaurant routes - handles restaurant management
 * Routes:
 * - GET    /api/restaurants/me
 * - POST   /api/restaurants
 */
app.use("/api/restaurants", restaurantRoutes);

/**
 * Bag routes - handles bag items (user view)
 * Routes:
 * - GET    /api/bags
 * - GET    /api/bags/:id
 *
 */
app.use("/api/bags", bagRoutes);

/**
 * Restaurant bag routes - handles bag management for restaurants
 * Routes:
 * - POST   /api/restaurants/bags
 * - PATCH  /api/restaurants/bags/:id
 * - DELETE /api/restaurants/bags/:id
 */
app.use("/api/restaurants/bags", restaurantBagRoutes);

/**
 * Order routes - handles order management
 * Routes:
 * - GET    /api/orders
 * - POST   /api/orders
 * - PATCH  /api/orders/:id
 * - DELETE /api/orders/:id
 */
app.use("/api/orders", orderRoutes);

/**
 * Restaurant order routes - handles order management for restaurants
 * Routes:
 * - GET    /api/restaurants/orders
 * - POST   /api/restaurants/orders
 * - PATCH  /api/restaurants/orders/:id
 * - DELETE /api/restaurants/orders/:id
 */
app.use("/api/restaurants/orders", restaurantOrderRoutes);


// ── Error Handling ──────────────────────────────────────────────────────────────────

/**
 * 404 Not Found handler - catches all unmatched routes
 * Forwards to error handler with 404 status
 */
app.use(notFound);

/**
 * Global error handler - centralizes error response formatting
 * Handles:
 * - Operational errors (AppError)
 * - Mongoose validation errors
 * - Mongoose duplicate key errors
 * - JWT errors (invalid, expired)
 * - Unhandled errors
 */
app.use(errorHandler);

module.exports = app;
