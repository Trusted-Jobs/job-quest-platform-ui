'use client';

import React from 'react';
import Link from 'next/link';
import '@fontsource/press-start-2p';
import Image from 'next/image';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center font-['Press Start 2P'] p-6 text-center text-gray-800">
      <Image
        src="/trusted-jobs-banner.png"
        alt="Trusted Jobs Banner"
        width={800}
        height={400}
        className="mb-6 shadow-[4px_4px_0px_black] border-4 border-blue-900"
      />

      {/* <h1 className="text-2xl md:text-4xl text-blue-900 mb-6 border-b-4  pb-2">
        🧱 JOB QUEST PLATFORM
      </h1> */}

      <p className="max-w-2xl text-[10px] md:text-xs leading-loose mb-8">
        Welcome to a super-safe job platform where you can safely post, browse, and apply for jobs.
        With decentralized verification and risk scoring, we ensure a fair and transparent
        environment for everyone.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="bg-white border-4 border-blue-900 p-4 rounded-none shadow-[4px_4px_0px_black]">
          <h2 className="text-blue-900 text-xs mb-2">🔍 Browse Jobs</h2>
          <p className="text-[9px] text-gray-700">
            Discover diverse job opportunities by category and risk level.
          </p>
        </div>

        <div className="bg-white border-4 border-blue-900 p-4 rounded-none shadow-[4px_4px_0px_black]">
          <h2 className="text-blue-900 text-xs mb-2">📝 Safe Applications</h2>
          <p className="text-[9px] text-gray-700">
            All recruiters are verified to protect applicants from risks.
          </p>
        </div>

        <div className="bg-white border-4 border-blue-900 p-4 rounded-none shadow-[4px_4px_0px_black]">
          <h2 className="text-blue-900 text-xs mb-2">💰 Auto Settlement</h2>
          <p className="text-[9px] text-gray-700">
            Rewards are pre-deposited and claimable after job completion.
          </p>
        </div>
      </div>

      <Link
        href="/login"
        className="mt-10 bg-blue-900 text-white px-6 py-3 border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:bg-blue-800 text-xs"
      >
        🎮 START EXPLORING
      </Link>
    </div>
  );
};

export default Home;
