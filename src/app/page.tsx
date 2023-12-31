import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl text-white font-bold text-center mb-4">
          Welcome to the botGPT.AI
        </h1>
        <div className="flex justify-center">
          <div className="inline-flex ">
            <Link
              href="/login"
              className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
            >
              SignUp
            </Link>
          </div>
        </div>
        {/* Rest of the content */}
      </div>
    </div>
  );
}
