const getVerificationEmailHTML = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify Your Email – ZeroHunger</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Manrope:wght@400;500;600&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background-color: #111111;
      font-family: 'Manrope', sans-serif;
      color: #f5f5f5;
      padding: 40px 16px;
    }
    .wrapper { max-width: 540px; margin: 0 auto; }

    .topbar {
      display: flex; align-items: center;
      justify-content: space-between;
      margin-bottom: 28px; padding: 0 4px;
    }
    .brand { display: flex; align-items: center; gap: 10px; }
    .brand-icon {
      width: 38px; height: 38px; background: #ff4d00;
      border-radius: 10px; display: flex;
      align-items: center; justify-content: center; font-size: 20px;
    }
    .brand-name {
      font-family: 'Syne', sans-serif; font-weight: 800;
      font-size: 21px; color: #ffffff; letter-spacing: -0.5px;
    }
    .brand-name span { color: #ff4d00; }
    .step-label {
      font-size: 11px; font-weight: 600;
      letter-spacing: 1.8px; text-transform: uppercase; color: #444;
    }

    .card {
      background: #1c1c1c; border: 1px solid #2b2b2b;
      border-radius: 20px; overflow: hidden; margin-bottom: 14px;
    }
    .streak {
      height: 4px;
      background: linear-gradient(90deg, #ff4d00 0%, #ff8c42 60%, #1c1c1c 100%);
    }
    .card-body { padding: 36px 36px 32px; }

    .eyebrow {
      font-size: 11px; font-weight: 600;
      letter-spacing: 2px; text-transform: uppercase;
      color: #ff4d00; margin-bottom: 14px;
    }
    .heading {
      font-family: 'Syne', sans-serif; font-weight: 800;
      font-size: 28px; line-height: 1.2; color: #ffffff;
      margin-bottom: 14px; letter-spacing: -0.5px;
    }
    .subtext { font-size: 14px; color: #888; line-height: 1.7; margin-bottom: 32px; }

    .otp-wrapper {
      background: #141414; border: 1px solid #2b2b2b;
      border-radius: 14px; padding: 28px 24px 22px;
      text-align: center; margin-bottom: 28px;
    }
    .otp-label {
      font-size: 11px; font-weight: 600;
      letter-spacing: 2px; text-transform: uppercase;
      color: #555; margin-bottom: 16px;
    }
    .otp-digits { display: flex; justify-content: center; gap: 10px; margin-bottom: 14px; }
    .otp-digit {
      width: 52px; height: 62px; background: #1e1e1e;
      border: 1px solid #333; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Syne', sans-serif; font-weight: 800;
      font-size: 28px; color: #ff4d00;
    }
    .otp-expiry { font-size: 12px; color: #555; display: flex; align-items: center; justify-content: center; gap: 6px; }
    .otp-expiry::before { content: ''; display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #ff4d00; }

    .how-strip { border-top: 1px solid #242424; padding-top: 24px; display: flex; gap: 0; }
    .how-step { flex: 1; text-align: center; padding: 0 8px; position: relative; }
    .how-step + .how-step::before { content: '→'; position: absolute; left: -6px; top: 10px; color: #333; font-size: 14px; }
    .how-icon { font-size: 22px; margin-bottom: 6px; display: block; }
    .how-text { font-size: 11px; color: #555; line-height: 1.5; }
    .how-text strong { display: block; color: #888; font-weight: 600; margin-bottom: 2px; font-size: 12px; }

    .safety {
      background: #1a1a1a; border: 1px solid #2b2b2b;
      border-radius: 14px; padding: 16px 20px; margin-bottom: 14px;
      display: flex; gap: 12px; align-items: flex-start;
    }
    .safety-icon { font-size: 16px; margin-top: 1px; flex-shrink: 0; }
    .safety-text { font-size: 13px; color: #555; line-height: 1.6; }
    .safety-text strong { color: #777; font-weight: 600; }

    .footer { text-align: center; padding: 8px 0 0; }
    .footer p { font-size: 12px; color: #333; line-height: 1.8; }
    .footer a { color: #444; text-decoration: none; }
  </style>
</head>
<body>
<div class="wrapper">

  <div class="topbar">
    <div class="brand">
      <div class="brand-icon">🍱</div>
      <div class="brand-name">Zero<span>Hunger</span></div>
    </div>
    <span class="step-label">Step 1 of 2</span>
  </div>

  <div class="card">
    <div class="streak"></div>
    <div class="card-body">
      <p class="eyebrow">Email verification</p>
      <h1 class="heading">One code away<br/>from saving food 🔥</h1>
      <p class="subtext">
        Enter the code below to verify your email.
        Restaurants near you are uploading discounted meals right now — don't miss out.
      </p>

      <p class="otp-label">Your verification code</p>
      <div class="otp-wrapper">
        <div class="otp-digits">
          ${otp.toString().split('').map(d => `<div class="otp-digit">${d}</div>`).join('')}
        </div>
        <p class="otp-expiry">Expires in 10 minutes</p>
      </div>

      <div class="how-strip">
        <div class="how-step">
          <span class="how-icon">🏪</span>
          <div class="how-text"><strong>Restaurant lists</strong>leftover food at discount</div>
        </div>
        <div class="how-step">
          <span class="how-icon">📍</span>
          <div class="how-text"><strong>You discover</strong>deals near you</div>
        </div>
        <div class="how-step">
          <span class="how-icon">✅</span>
          <div class="how-text"><strong>Book &amp; pick up</strong>zero waste, saved money</div>
        </div>
      </div>
    </div>
  </div>

  <div class="safety">
    <span class="safety-icon">🔒</span>
    <p class="safety-text">
      <strong>Didn't sign up?</strong> Ignore this email — no account will be activated without this code. Your inbox is safe.
    </p>
  </div>

  <div class="footer">
    <p>© 2025 ZeroHunger · Fighting food waste, one meal at a time</p>
    <p><a href="#">Unsubscribe</a> · <a href="#">Privacy Policy</a></p>
  </div>

</div>
</body>
</html>
`;
module.exports = { getVerificationEmailHTML };