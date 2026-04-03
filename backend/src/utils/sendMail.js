const { transporter } = require("../config/nodemailer");
const sendEmail = async (email, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER, // SAME as auth.user ✅
      to: email,
      subject: subject,
      text: text,
    });
    console.log("Message sent:", info.messageId);

    if (info.rejected.length > 0) {
      console.warn("Some recipients were rejected:", info.rejected);
    }
  } catch (err) {
    switch (err.code) {
      case "ECONNECTION":
      case "ETIMEDOUT":
        console.error("Network error - retry later:", err.message);
        break;
      case "EAUTH":
        console.error("Authentication failed:", err.message);
        break;
      case "EENVELOPE":
        console.error("Invalid recipients:", err.rejected);
        break;
      default:
        console.error("Send failed:", err.message);
    }
  }
};

module.exports = sendEmail;
