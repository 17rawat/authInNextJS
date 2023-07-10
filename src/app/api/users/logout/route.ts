import { NextResponse } from "next/server";

const GET = () => {
  try {
    const response = NextResponse.json(
      {
        msg: "Logout successful",
      },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export { GET };
