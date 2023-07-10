import connect from "@/dbConfig/db";
import User from "@/models/user";

import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";

connect();

const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();
    const { name, email, password } = requestBody;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ msg: "User already exits" }, { status: 400 });
    }

    const hashedPassword = await bcryptjs.hash(password, 10); // encrypting the password

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    // console.log(savedUser);

    // sending verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json(
      {
        msg: "We have sent you an email, Please verify to continue",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export { POST };
