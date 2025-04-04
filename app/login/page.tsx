"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "@fontsource/press-start-2p";

export default function AuthButtons() {
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (isRegister) {
      alert("✅ Registration successful!");
      // 可選導向註冊成功頁面或轉為登入
      setIsRegister(false);
    } else {
      // 假裝登入成功，導向 job-listing
      router.push("/job-listing");
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
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full border-4 border-blue-900 rounded-none p-2 bg-gray-100 shadow-[2px_2px_0px_black]"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full border-4 border-blue-900 rounded-none p-2 bg-gray-100 shadow-[2px_2px_0px_black]"
            placeholder="********"
          />
        </div>

        {isRegister && (
          <div>
            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
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
