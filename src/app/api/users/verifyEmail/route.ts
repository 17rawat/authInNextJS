import connect from "@/dbConfig/db";
import User from "@/models/user";

import { NextRequest, NextResponse } from "next/server";

connect();

const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();

    const { token } = requestBody;

    // console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    // console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
};

export { POST };
