import { NextRequest, NextResponse } from "next/server";

import User from "@/models/user";
import connect from "@/dbConfig/db";
import { getDataFromToken } from "@/helper/getDataFromToken";

connect();

const GET = async (request: NextRequest) => {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User found",
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

export { GET };
