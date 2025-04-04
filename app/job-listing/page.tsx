'use client';

import React, { useState } from 'react';
import '@fontsource/press-start-2p';

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'PixelSoft',
    location: 'Remote',
    salary: '$3000/month',
    recruiter: {
      name: 'Alice from PixelSoft',
      riskLevel: 'MEDIUM',
      creditRating: 3
    }
  },
  {
    id: 2,
    title: 'Game Designer',
    company: 'RetroWorks',
    location: 'New York',
    salary: '$4000/month',
    recruiter: {
      name: 'Bob from RetroWorks',
      riskLevel: 'LOW',
      creditRating: 5
    }
  },
  {
    id: 3,
    title: 'QA Tester',
    company: 'BitQuest',
    location: 'Remote',
    salary: '$2500/month',
    recruiter: {
      name: 'Carol from BitQuest',
      riskLevel: 'HIGH',
      creditRating: 2
    }
  }
];

export default function JobListings() {
  type Recruiter = {
    name: string;
    riskLevel: string;
    creditRating: number;
  };

  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(null);
  return (
    <div className="min-h-screen bg-yellow-50 font-['Press Start 2P'] text-gray-800">
      <div className="flex flex-col items-center justify-start p-6">
        <h1 className="text-xl text-blue-900 mb-6 border-b-4 border-blue-900 pb-2 text-center">
          📃 JOB LISTINGS
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl text-[10px]">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border-4 border-blue-900 p-4 rounded-none shadow-[4px_4px_0px_black]"
            >
              <h2 className="text-blue-900 mb-2">💼 {job.title}</h2>
              <p className="text-gray-800">🏢 {job.company}</p>
              <p className="text-gray-800">🌍 {job.location}</p>
              <p className="text-gray-800">💰 {job.salary}</p>
              <p className="text-gray-800">
                👤 Recruiter:{' '}
                <button
                  onClick={() => setSelectedRecruiter(job.recruiter)}
                  className="underline text-blue-700 hover:text-blue-900"
                >
                  {job.recruiter.name}
                </button>
              </p>
              <button className="mt-4 bg-blue-900 text-white py-2 px-4 border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:bg-blue-800">
                🎯 APPLY
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedRecruiter && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white border-4 border-blue-900 p-6 rounded-none shadow-[6px_6px_0px_black] max-w-md w-full text-center text-[10px]">
            <h1 className="text-xl text-blue-900 mb-6 border-b-4 border-blue-900 pb-2">
              🧮 RISK & CREDIT
            </h1>
            <p className="mb-4">👤 Recruiter: {selectedRecruiter.name}</p>
            <p className="mb-4">⚠️ Risk Level: {selectedRecruiter.riskLevel}</p>

            <div className="mb-4">
              <p className="mb-2">⭐ Credit Rating:</p>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={
                      star <= selectedRecruiter.creditRating ? 'text-yellow-500' : 'text-gray-400'
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedRecruiter(null)}
              className="mt-4 bg-blue-900 text-white py-2 px-4 border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:bg-blue-800"
            >
              ❌ CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
