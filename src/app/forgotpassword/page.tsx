"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const loadingToastId = toast.loading("Processing...");

    try {
      const response = await axios.post("/api/users/forgotpassword", {
        email,
      });

      // console.log(response);

      setEmail(" ");

      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    toast.dismiss(loadingToastId);
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-white pt-8">
      <div className="max-w-md p-6 bg-white rounded shadow">
        <h2 className="mb-6 text-2xl text-blue-600 font-bold">
          Password Reset
        </h2>

        <h5 className="mb-6 text-m bg-yellow-100 text-black p-4">
          Forgotten your password? Enter your email address below, and we will
          send you an email allowing you to reset it.
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Send Reset Link
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default ForgotPasswordPage;
