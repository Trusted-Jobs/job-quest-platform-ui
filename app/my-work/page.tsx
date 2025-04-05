'use client';

import React, { useEffect, useState, useCallback } from 'react';
import '@fontsource/press-start-2p';
import TopBar from '@/components/Top-Bar';

export default function MyWork() {
  const [workStatus, setWorkStatus] = useState<{
    applied: { jobId: number; title: string }[];
    inProgress: { jobId: number; title: string }[];
    completed: { jobId: number; title: string }[];
  }>({
    applied: [],
    inProgress: [],
    completed: []
  });

  const fetchMyJobs = useCallback(async () => {
    try {
      const response = await fetch('/api/myJobs', {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();

      const categorizedJobs: {
        applied: { jobId: number; title: string }[];
        inProgress: { jobId: number; title: string }[];
        completed: { jobId: number; title: string }[];
      } = {
        applied: [],
        inProgress: [],
        completed: []
      };

      data.forEach((job: { jobId: number; status: string; title: string }) => {
        if (job.status === 'applied') {
          categorizedJobs.applied.push({ jobId: job.jobId, title: job.title });
        } else if (job.status === 'inProgress') {
          categorizedJobs.inProgress.push({ jobId: job.jobId, title: job.title });
        } else if (job.status === 'completed') {
          categorizedJobs.completed.push({ jobId: job.jobId, title: job.title });
        }
      });

      setWorkStatus(categorizedJobs);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  }, []);

  useEffect(() => {
    fetchMyJobs();
  }, [fetchMyJobs]);

  async function updateJobStatus(jobId: number, currentStatus: string) {
    const nextStatus = currentStatus === 'applied' ? 'inProgress' : 'completed';
    try {
      const response = await fetch('/api/updateJobStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId, status: nextStatus })
      });

      if (response.ok) {
        fetchMyJobs();
      } else {
        console.error('Failed to update job status');
      }
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  }

  return (
    <div className="min-h-screen bg-yellow-50 font-['Press Start 2P'] text-gray-800">
      <TopBar />
      <div className="flex flex-col items-center justify-start p-6">
        <h1 className="text-xl text-blue-900 mb-6 border-b-4 border-blue-900 pb-2 text-center">
          📂 MY JOBS
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl text-[10px]">
          <div className="bg-white border-4 border-blue-900 p-4 rounded-none shadow-[4px_4px_0px_black]">
            <h2 className="text-blue-900 mb-2 text-center">📝 APPLIED</h2>
            {workStatus.applied.map((job) => (
              <div key={job.jobId} className="flex justify-between items-center mb-2">
                <span>📌 {job.title}</span>
                <button
                  className="w-6 h-6 bg-blue-500 border-2 border-blue-900 shadow-[2px_2px_0px_black] hover:shadow-[4px_4px_0px_black] active:shadow-none flex items-center justify-center"
                  onClick={() => updateJobStatus(job.jobId, 'applied')}
                >
                  ➡️
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white border-4 border-blue-900 p-4 rounded-none shadow-[4px_4px_0px_black]">
            <h2 className="text-blue-900 mb-2 text-center">🚧 IN PROGRESS</h2>
            {workStatus.inProgress.map((job) => (
              <div key={job.jobId} className="flex justify-between items-center mb-2">
                <span>🕹️ {job.title}</span>
                <button
                  className="w-6 h-6 bg-green-500 border-2 border-blue-900 shadow-[2px_2px_0px_black] hover:shadow-[4px_4px_0px_black] active:shadow-none flex items-center justify-center"
                  onClick={() => updateJobStatus(job.jobId, 'inProgress')}
                >
                  ✅
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white border-4 border-blue-900 p-4 rounded-none shadow-[4px_4px_0px_black]">
            <h2 className="text-blue-900 mb-2 text-center">✅ COMPLETED</h2>
            {workStatus.completed.map((job) => (
              <p key={job.jobId} className="mb-2">
                🏁 {job.title}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
