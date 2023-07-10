"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { toast, Toaster } from "react-hot-toast";

export default function VerifyEmail() {
  const [token, setToken] = useState("");

  const verifyUserEmail = async () => {
    const loadingToastId = toast.loading("Processing...");
    try {
      const response = await axios.post("/api/users/verifyEmail", { token });

      // console.log(response);
      if (response.data && response.data.message) {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      // console.log(error.response.data);
      toast.error(error.response.data.message);
    }

    toast.dismiss(loadingToastId);
  };

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md shadow-md rounded-md bg-white p-6">
        <h1 className="text-3xl text-green-600 font-bold mb-4">
          Thank you for verifying
        </h1>
        <h2 className="text-2xl text-blue-800 mb-4">
          Please login to continue
        </h2>
        <Link
          href="/login"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </Link>
      </div>
      <Toaster />
    </div>
  );
}
