/**
 * Generates HTML email template for email verification emails.
 *
 * Sends a professionally designed HTML email to users for OTP verification.
 * Includes the 6-digit OTP code, branding, and instructions.
 *
 */

const getVerificationEmailHTML = (otp) => {
  return `
    <div>
      <h2>Email Verification</h2>
      <p>Your verification code is: <strong>${otp}</strong></p>
      <p>Please enter this code to verify your email address.</p>
    </div>
  `;
};
module.exports = { getVerificationEmailHTML };
