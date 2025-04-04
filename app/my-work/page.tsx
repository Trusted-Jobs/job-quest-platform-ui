"use client";

import React from "react";
import "@fontsource/press-start-2p";
import TopBar from "@/components/Top-Bar";

const workStatus = {
  applied: ["Frontend Developer - PixelSoft"],
  inProgress: ["QA Tester - BitQuest"],
  completed: ["Game Designer - RetroWorks"],
};

export default function MyWork() {
  return (
    <div className="min-h-screen bg-yellow-50 font-['Press Start 2P'] text-gray-800">
      <TopBar /> {/* 直接在最外層 */}

      <div className="flex flex-col items-center justify-start p-6">
        <h1 className="text-xl text-blue-900 mb-6 border-b-4 border-blue-900 pb-2 text-center">
          📂 MY JOBS
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl text-[10px]">
          <div className="bg-white border-4 border-blue-900 p-4 rounded-none shadow-[4px_4px_0px_black]">
            <h2 className="text-blue-900 mb-2 text-center">📝 APPLIED</h2>
            {workStatus.applied.map((job, idx) => (
              <p key={idx} className="mb-2">📌 {job}</p>
            ))}
          </div>

          <div className="bg-white border-4 border-blue-900 p-4 rounded-none shadow-[4px_4px_0px_black]">
            <h2 className="text-blue-900 mb-2 text-center">🚧 IN PROGRESS</h2>
            {workStatus.inProgress.map((job, idx) => (
              <p key={idx} className="mb-2">🕹️ {job}</p>
            ))}
          </div>

          <div className="bg-white border-4 border-blue-900 p-4 rounded-none shadow-[4px_4px_0px_black]">
            <h2 className="text-blue-900 mb-2 text-center">✅ COMPLETED</h2>
            {workStatus.completed.map((job, idx) => (
              <p key={idx} className="mb-2">🏁 {job}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
