"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    const loadingToastId = toast.loading("Processing...");
    try {
      const response = await axios.get("/api/users/logout");

      if (response.data && response.data.msg) {
        toast.success(response.data.msg);
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error.message);
    }

    toast.dismiss(loadingToastId);
  };

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto py-4 ">
        <ul className="flex items-center justify-end">
          <li className="mr-4">
            <Link href="/home">Home</Link>
          </li>
          <li className="mr-4">
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <Toaster />
    </header>
  );
}

export default Header;
