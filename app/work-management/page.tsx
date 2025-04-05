'use client';

import React, { useEffect, useState, useCallback } from 'react';
import '@fontsource/press-start-2p';
import TopBar from '@/components/Top-Bar';
import { ethers } from 'ethers';
import { abi } from '../content/abi';

export default function WorkManagement() {
  const [posts, setPosts] = useState<{ jobId: number; title: string; status: string }[]>([]);

  const fetchMyPosts = useCallback(async () => {
    try {
      const response = await fetch('/api/myPosts', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  }, []);

  const handleCancelJob = async (jobId: number) => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask wallet!');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum!);
      const signer = await provider.getSigner();

      const contractAddress = process.env.CONTRACT_ADDRESS || '0xBF7F45091686b4d5c4f9184D1Fa30A6731a49036'; // Replace with actual contract address
      if (!contractAddress) {
        alert('Contract address is not set. Please check your environment variables!');
        return;
      }

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const result = await contract.refundToRecruiter(jobId);

      console.log('Transaction result:', result);

      // Call updateJobStatus API to update the job status to "cancelled"
      const updateJobStatusResponse = await fetch('/api/updateJobStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId, status: 'cancelled' }),
      });

      if (!updateJobStatusResponse.ok) {
        throw new Error('Failed to update job status');
      }

      const { job: updatedJob } = await updateJobStatusResponse.json();

      // Update the local posts state with the updated job
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.jobId === updatedJob.jobId ? { ...post, status: updatedJob.status } : post
        )
      );

      alert('🎉 Job successfully canceled!');
    } catch (error) {
      console.error('Cancellation failed:', error);
      alert('❌ Cancellation failed. Please try again.');
    }
  };

  const handleCloseAndPay = async (jobId: number) => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask wallet!');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum!);
      const signer = await provider.getSigner();

      const contractAddress = process.env.CONTRACT_ADDRESS || '0xBF7F45091686b4d5c4f9184D1Fa30A6731a49036'; // Replace with actual contract address
      if (!contractAddress) {
        alert('Contract address is not set. Please check your environment variables!');
        return;
      }
      
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const result = await contract.withdrawToApplicant(jobId);

      console.log('Transaction result:', result);

      // Call updateJobStatus API to update the job status to "closed"
      const updateJobStatusResponse = await fetch('/api/updateJobStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId, status: 'closed' }),
      });

      if (!updateJobStatusResponse.ok) {
        throw new Error('Failed to update job status');
      }

      const { job: updatedJob } = await updateJobStatusResponse.json();

      // Update the local posts state with the updated job
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.jobId === updatedJob.jobId ? { ...post, status: updatedJob.status } : post
        )
      );

      alert('🎉 Job successfully closed and payment completed!');
    } catch (error) {
      console.error('Close and Pay failed:', error);
      alert('❌ Close and Pay failed. Please try again.');
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  return (
    <div className="min-h-screen bg-yellow-50 font-['Press Start 2P'] text-gray-800">
      <TopBar />
      <div className="flex flex-col items-center justify-start p-6">
        <h1 className="text-xl text-blue-900 mb-6 border-b-4 border-blue-900 pb-2 text-center">
          📋 MY POSTED JOBS
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl text-[10px]">
          {posts.map((post) => (
            <div
              key={post.jobId}
              className="bg-white border-4 border-blue-900 p-4 rounded-none shadow-[4px_4px_0px_black]"
            >
              <h2 className="text-blue-900 mb-2">🧱 {post.title}</h2>
              <p className="mb-1">📊 Status: {post.status}</p>
              <div className="flex space-x-4 mt-4">
                {post.status === 'new' && (
                  <button
                    onClick={() => handleCancelJob(post.jobId)}
                    className="bg-blue-900 text-white py-2 px-4 border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:bg-blue-800"
                  >
                    ❌ CANCEL JOB
                  </button>
                )}
                {post.status === 'completed' && (
                  <button
                    onClick={() => handleCloseAndPay(post.jobId)}
                    className="bg-green-600 text-white py-2 px-4 border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:bg-green-500"
                  >
                    💳 CLOSE & PAY
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
