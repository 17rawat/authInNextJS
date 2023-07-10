import connect from "@/dbConfig/db";
import User from "@/models/user";

import bcryptjs from "bcryptjs";

import { NextRequest, NextResponse } from "next/server";

connect();

const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();

    const { token, password } = requestBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    // console.log(user);

    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};

export { POST };
