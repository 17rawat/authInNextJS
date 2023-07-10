"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPassword = async (e: any) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    e.preventDefault();

    const loadingToastId = toast.loading("Processing...");

    try {
      const response = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });

      toast.success(response.data.message);

      router.push("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }

    toast.dismiss(loadingToastId);
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md shadow-md rounded-md bg-white p-6">
        <h2 className="mt-2 text-blue-900 text-center text-2xl font-bold text-gray-900">
          Reset Password
        </h2>
        <div className="mb-6 mt-6">
          <input
            className="text-black w-full py-2 px-4 border border-gray-300 rounded"
            type="password"
            id="password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <input
            className="text-black w-full py-2 px-4 border border-gray-300 rounded"
            type="password"
            id="confirmPassword"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={resetPassword}
          type="button"
        >
          Reset
        </button>
      </div>
      <Toaster />
    </div>
  );
}
