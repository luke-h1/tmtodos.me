import nodemailer from "nodemailer";
export async function sendEmail(to: string, html: string) {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: "mds43vi6nviwucqv@ethereal.email",
      pass: "xJsQzVAuFYKqx5xUR9",
    },
  });

  let info = await transporter.sendMail({
    from: '"Take My Notes 📝"',
    to: to,
    subject: "Take My Notes | Change password",
    html,
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
