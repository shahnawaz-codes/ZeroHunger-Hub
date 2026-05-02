const mongoose = require("mongoose");

/**
 * Connects to MongoDB database using Mongoose.
 * Initializes the database connection on server startup.
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>}
 * @throws {Error} Logs error and exits process if connection fails
 *
 * @example
 * // In server.js
 * connectDB().then(async () => {
 *   app.listen(PORT, () => {
 *     console.log(`Server running on port ${PORT}`);
 *   });
 * });
 *
 * @description
 * - Requires MONGODB_URI environment variable to be set
 * - Exits process with code 1 on connection failure
 * - Logs connection status to console
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
