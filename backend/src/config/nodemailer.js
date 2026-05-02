const nodemailer = require("nodemailer");

/**
 * Nodemailer transporter instance for sending emails via Gmail SMTP.
 *
 * Configuration Details:
 * - Host: smtp.gmail.com
 * - Port: 587 (uses STARTTLS to upgrade connection to TLS)
 * - Auth: Uses SMTP_USER and SMTP_PASS from environment variables
 *
 * @type {nodemailer.Transporter}
 *
 * @requires SMTP_USER - Gmail email address (environment variable)
 * @requires SMTP_PASS - Gmail app-specific password (environment variable)
 *
 * @note For Gmail, enable "Less secure app access" or use app-specific passwords
 */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Verifies the SMTP transporter connection before starting the server.
 * This ensures email functionality is working before accepting requests.
 *
 * @async
 * @function verifyTransporter
 * @returns {Promise<void>}
 * @throws {Error} Throws error if SMTP connection verification fails
 *
 * @example
 * // In server.js startup
 * connectDB().then(async () => {
 *   await verifyTransporter();
 *   app.listen(PORT, () => console.log(`Server running on ${PORT}`));
 * });
 *
 * @description
 * - Called during server startup to validate email service
 * - Logs confirmation message on successful verification
 * - Throws error if credentials are invalid or SMTP unreachable
 */
const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log("✅ SMTP server connection verified");
  } catch (error) {
    throw new Error(`SMTP verification failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { transporter, verifyTransporter };
