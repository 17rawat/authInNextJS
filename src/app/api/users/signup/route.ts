import connect from "@/dbConfig/db";
import User from "@/models/user";

import { NextRequest, NextResponse } from "next/server";

import bcryptjs from "bcryptjs";

const POST = async (request: NextRequest) => {
  try {
    const requestBody = await request.json();
    const { name, email, password } = requestBody;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ msg: "User already exits" }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // const hashedPassword = await bcryptjs.hash(password, 10); // encrypting the password

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log(newUser);

    return NextResponse.json(
      { msg: "user created successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export { POST };

connect();
