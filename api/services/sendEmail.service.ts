import 'dotenv/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.HOST_URI,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendEmail = async (to: string, subject: string, text: string) => {
  if (!to || !subject || !text) {
    throw new Error(`Email params missing !`);
  }
  try {
    await transporter.sendMail({
      from: process.env.ADMIN_EMAIL,
      to, subject, text,
    });

    console.log(`Email sent to: ${to}`);
  }
  catch (error) {
    console.error(`Error in sending email: ${error}`);
  }
}

export default sendEmail;