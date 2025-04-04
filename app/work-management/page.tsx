'use client';

import React from 'react';
import '@fontsource/press-start-2p';
import TopBar from '@/components/Top-Bar';

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    applicants: 3,
    progress: 'In Progress'
  },
  {
    id: 2,
    title: 'Game Designer',
    applicants: 1,
    progress: 'Completed'
  },
  {
    id: 3,
    title: 'QA Tester',
    applicants: 2,
    progress: 'Pending'
  }
];

export default function WorkManagement() {
  return (
    <div className="min-h-screen bg-yellow-50 font-['Press Start 2P'] text-gray-800">
      <TopBar />
      <div className="flex flex-col items-center justify-start p-6">
        <h1 className="text-xl text-blue-900 mb-6 border-b-4 border-blue-900 pb-2 text-center">
          📋 MY POSTED JOBS
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl text-[10px]">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border-4 border-blue-900 p-4 rounded-none shadow-[4px_4px_0px_black]"
            >
              <h2 className="text-blue-900 mb-2">🧱 {job.title}</h2>
              <p className="mb-1">👥 Applicants: {job.applicants}</p>
              <p className="mb-1">📊 Status: {job.progress}</p>
              <button className="mt-4 bg-blue-900 text-white py-2 px-4 border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:bg-blue-800">
                🔎 VIEW DETAILS
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
