"use client";

import { useRouter } from "next/navigation";

import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

function Dashboard() {
  const router = useRouter();

  const [user, setUser] = useState<any>({});

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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/users/userprofile");
        // console.log(response);

        setUser(response.data.user);

        // console.log(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto py-4 ">
        <ul className="flex items-center justify-end">
          <h4 className="text-xl font mr-4">Welcome {user.name}</h4>
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

export default Dashboard;
