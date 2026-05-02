/**
 * ZeroHunger API Server Entry Point
 *
 * Initializes environment variables, connects to database and email service,
 * then starts the HTTP server.
 *
 * Server Startup Sequence:
 * 1. Load environment variables from .env file
 * 2. Connect to MongoDB database
 * 3. Verify SMTP email transporter connection
 * 4. Start Express server on configured PORT
 *
 * @requires dotenv - Environment variable loader
 * @requires ./app - Express application instance
 * @requires ./config/db - Database connection function
 * @requires ./config/nodemailer - Email transporter and verification
 */
require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const { verifyTransporter } = require("./config/nodemailer");

/**
 * Server port from environment variable or default to 5000
 * @type {number}
 */
const PORT = process.env.PORT || 5000;

/**
 * Startup sequence:
 * 1. Connect to MongoDB
 * 2. Verify email service (SMTP transporter)
 * 3. Start listening on PORT
 *
 * If database connection fails, process exits with code 1
 * If email service verification fails, error is thrown and process exits
 */
connectDB().then(async () => {
  await verifyTransporter();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} [${process.env.NODE_ENV}]`);
  });
});
