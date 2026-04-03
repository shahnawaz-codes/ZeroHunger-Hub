const nodemailer = require("nodemailer");

// Create a transporter using SMTP
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
 * Verify transporter connection before starting the server
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
