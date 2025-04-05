"use client";

import React, { useState, useEffect } from "react";
import "@fontsource/press-start-2p";
import TopBar from "@/components/Top-Bar";
import { ethers } from "ethers";
import { abi } from "../content/abi";
import { getCookie } from "cookies-next";

export default function JobListings() {
  type Recruiter = {
    name: string;
    riskLevel: string;
    creditRating: number;
    isVerified: string[];
  };

  type Job = {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    recruiter: Recruiter;
    status?: string;
  };

  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState<Recruiter | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/api/jobs")
      .then((response) => response.json())
      .then((data) => setJobs(data));

    const userRole = getCookie("name");
    setIsAdmin(userRole === "Admin");
  }, []);

  const handleApply = async (jobId: number, status: string = "applied") => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask wallet!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum!);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      console.log("User address:", userAddress);

      const contractAddress = process.env.CONTRACT_ADDRESS || "0xBF7F45091686b4d5c4f9184D1Fa30A6731a49036"; // Replace with actual contract address
      if (!contractAddress) {
        alert("Contract address is not set. Please check your environment variables!");
        return;
      }

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const result = await contract.applyJob(jobId);

      console.log("Transaction result:", result);

      // Get user name from cookies using cookies-next
      const userName = getCookie("userName");
      if (!userName || typeof userName !== "string") {
        throw new Error("User name not found in cookies");
      }

      // Call updateUser API to store the jobId in the user's myJobs array
      const updateResponse = await fetch("/api/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          myJobs: [jobId],
        }),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update user data");
      }

      const updateJobStatusResponse = await fetch("/api/updateJobStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId, status }),
      });

      if (!updateJobStatusResponse.ok) {
        throw new Error("Failed to update job status");
      }

      const { job: updatedJob } = await updateJobStatusResponse.json();

      // Update the local jobs state with the updated job
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.id === updatedJob.id ? { ...job, status: updatedJob.status } : job))
      );

      alert(`🎉 Application successful! Job status updated to ${status}`);
    } catch (error) {
      console.error("Application failed:", error);
      alert("❌ Application failed. This job has already been applied.");
    }
  };

  const handleArbitrate = async (jobId: number, action: "slashToRecruiter" | "slashToApplicant") => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask wallet!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum!);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      const contractAddress = process.env.CONTRACT_ADDRESS || "0xBF7F45091686b4d5c4f9184D1Fa30A6731a49036"; // Replace with actual contract address
      if (!contractAddress) {
        alert("Contract address is not set. Please check your environment variables!");
        return;
      }

      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Check if the user is the arbitrator
      const arbitrator = await contract.arbitrator();
      if (userAddress.toLowerCase() !== arbitrator.toLowerCase()) {
        alert("❌ You are not authorized to perform arbitration.");
        return;
      }

      let result;
      if (action === "slashToRecruiter") {
        result = await contract.slashToRecruiter(jobId);
      } else if (action === "slashToApplicant") {
        result = await contract.slashToApplicant(jobId);
      }

      console.log("Arbitration result:", result);

      // Update job status to "closed"
      const updateJobStatusResponse = await fetch("/api/updateJobStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobId, status: "closed" }),
      });

      if (!updateJobStatusResponse.ok) {
        throw new Error("Failed to update job status");
      }

      const { job: updatedJob } = await updateJobStatusResponse.json();

      // Update the local jobs state with the updated job
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.id === updatedJob.id ? { ...job, status: updatedJob.status } : job))
      );

      alert(`🎉 Arbitration successful! Action: ${action}. Job status updated to "closed".`);
    } catch (error) {
      console.error("Arbitration failed:", error);
      alert(`❌ Arbitration failed: ${error.reason || error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 font-['Press Start 2P'] text-gray-800">
      <TopBar />
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
                👤 Recruiter: <button onClick={() => setSelectedRecruiter(job.recruiter)} className="underline text-blue-700 hover:text-blue-900">{job.recruiter.name}</button>
              </p>
              {isAdmin ? (
                job.status === "completed" && (
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() => handleArbitrate(job.id, "slashToRecruiter")}
                      className="py-2 px-4 bg-green-500 text-white border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:bg-green-400"
                    >
                      💰 Refund to Recruiter
                    </button>
                    <button
                      onClick={() => handleArbitrate(job.id, "slashToApplicant")}
                      className="py-2 px-4 bg-red-500 text-white border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:bg-red-400"
                    >
                      💰 Pay to Applicant
                    </button>
                  </div>
                )
              ) : (
                <button
                  onClick={() => handleApply(job.id)}
                  disabled={job.status !== "new"} // Disable button if status is not "new"
                  className={`mt-4 py-2 px-4 border-4 border-black rounded-none shadow-[4px_4px_0px_black] ${
                    job.status === "new"
                      ? "bg-blue-900 text-white hover:bg-blue-800"
                      : "bg-gray-400 text-gray-700 cursor-not-allowed"
                  }`}
                >
                  🎯 APPLY
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedRecruiter && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white border-4 border-blue-900 p-6 rounded-none shadow-[6px_6px_0px_black] max-w-md w-full text-center text-[10px]">
            <h1 className="text-xl text-blue-900 mb-6 border-b-4 border-blue-900 pb-2">
              🧮 RISK & VERIFIED
            </h1>
            <p className="mb-4">👤 Recruiter: {selectedRecruiter.name}</p>
            <p className="mb-4">⚠️ Risk Level: {selectedRecruiter.riskLevel}</p>
            <p className="mb-4">
              ✅ Verified: {selectedRecruiter.isVerified.length > 0 ? selectedRecruiter.isVerified.join(", ") : "None"}
            </p>
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