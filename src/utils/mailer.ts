import { userAgent } from "next/server";
import nodemailer from "nodemailer";

export async function sendEmail({
  email,
  url,
  token,
}: {
  email: string;
  url: string;
  token: string;
}) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: "jane Doe <j.doe@gmail.com>",
    to: email,
    subject: "Login to your account",
    html: `Login by clicking<a href="${url}/login#token=${token}">HERE</a>`,
  });

  console.log(`preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}
