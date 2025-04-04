"use client";

import React, { useState } from "react";
import "@fontsource/press-start-2p";

export default function ClaimReward() {
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    setClaimed(true);
    alert("Reward successfully claimed!");
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-6 font-['Press Start 2P'] text-gray-800">
      <div className="bg-white border-4 border-blue-900 p-6 rounded-none shadow-[6px_6px_0px_black] max-w-md w-full text-center text-[10px]">
        <h1 className="text-xl text-blue-900 mb-6 border-b-4 border-blue-900 pb-2">
          🎁 CLAIM REWARD
        </h1>
        <p className="mb-4">Job: Frontend Developer - PixelSoft</p>
        <p className="mb-6">Reward: $3000</p>
        {claimed ? (
          <p className="text-green-600 font-bold">✅ Claimed</p>
        ) : (
          <button
            onClick={handleClaim}
            className="bg-blue-900 text-white py-3 px-6 border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:bg-blue-800"
          >
            🎉 CLAIM NOW
          </button>
        )}
      </div>
    </div>
  );
}
