import nodemailer from "nodemailer";
import User from "@/models/user";
import bcryptjs from "bcryptjs";

export async function sendEmail({ email, emailType, userId }: any) {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER_NAME,
        pass: process.env.PASS_WORD,
      },
    });

    const mailOptions = {
      from: "botGPT.AI@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",

      html: `<p>Click <a href="${process.env.DOMAIN_NAME}${
        emailType === "VERIFY" ? "/verifyemail" : "/resetpassword"
      }?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser.<br>${
        process.env.DOMAIN_NAME
      }${
        emailType === "VERIFY" ? "/verifyemail" : "/resetpassword"
      }?token=${hashedToken}</p>`,
    };

    const mailresponse = await transporter.sendMail(mailOptions);

    // console.log(mailresponse);

    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
