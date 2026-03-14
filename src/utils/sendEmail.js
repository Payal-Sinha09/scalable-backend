import nodemailer from "nodemailer";

const sendEmail = async (email, resetToken) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const message = `
    <h2>Password Reset</h2>
    <p>Click the link below to reset your password:</p>
    <a href="${resetURL}">${resetURL}</a>
    <p>This link will expire in 15 minutes.</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: message
  });

};

export default sendEmail;