import connect from "@/dbConfig/db";
import User from "@/models/user";
import { sendEmail } from "@/helper/mailer";

import { NextRequest, NextResponse } from "next/server";

connect();

const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();

    // console.log(requestBody);

    const { email } = requestBody;

    // console.log(email);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid Token " }, { status: 400 });
    }

    // console.log(user);

    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};

export { POST };
