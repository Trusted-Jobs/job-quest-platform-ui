"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "@fontsource/press-start-2p";

export default function AuthButtons() {
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;

    if (isRegister) {
      const name = ((e.target as HTMLFormElement).elements.namedItem("name") as HTMLInputElement).value;
      const confirmPassword = (e.target as HTMLFormElement).confirmPassword.value;
      if (password !== confirmPassword) {
        alert("❌ Password and Confirm Password do not match!");
        return;
      }

      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name }),
        });

        if (res.ok) {
          alert("✅ Registration successful!");
          setIsRegister(false);
        } else {
          const { message } = await res.json();
          alert(`❌ ${message}`);
        }
      } catch (error) {
        alert("❌ An error occurred. Please try again.");
      }
    } else {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
          router.push("/job-listing");
        } else {
          const { message } = await res.json();
          alert(`❌ ${message}`);
        }
      } catch (error) {
        alert("❌ An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-4 font-['Press Start 2P'] text-gray-800">
      <h1 className="text-xl text-blue-900 mb-6 border-b-4 border-blue-900 pb-2">
        {isRegister ? "🚪 CREATE ACCOUNT" : "🔑 LOGIN"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border-4 border-blue-900 p-6 rounded-none shadow-[6px_6px_0px_black] w-full max-w-sm space-y-4 text-[10px]"
      >
        {isRegister && (
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border-4 border-blue-900 rounded-none p-2 bg-gray-100 shadow-[2px_2px_0px_black]"
              placeholder="Your Name"
            />
          </div>
        )}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border-4 border-blue-900 rounded-none p-2 bg-gray-100 shadow-[2px_2px_0px_black]"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            className="w-full border-4 border-blue-900 rounded-none p-2 bg-gray-100 shadow-[2px_2px_0px_black]"
            placeholder="********"
          />
        </div>

        {isRegister && (
          <div>
            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full border-4 border-blue-900 rounded-none p-2 bg-gray-100 shadow-[2px_2px_0px_black]"
              placeholder="********"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-3 mt-2 border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:bg-blue-800"
        >
          {isRegister ? "🚀 REGISTER" : "👉 LOGIN"}
        </button>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-700 hover:underline"
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </div>
      </form>
    </div>
  );
}
