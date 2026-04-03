require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const { verifyTransporter } = require("./config/nodemailer");

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await verifyTransporter();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} [${process.env.NODE_ENV}]`);
  });
});
