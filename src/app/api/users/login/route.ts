import connect from "@/dbConfig/db";
import User from "@/models/user";

import jwt from "jsonwebtoken";

import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";

const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;

    // console.log(requestBody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { msg: "Invaild Email Or User does not exist" },
        { status: 400 }
      );
    }

    // console.log(user);

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ msg: "Invaild Password" }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        msg: "Login successful",
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    // console.log(response);

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export { POST };

connect();
