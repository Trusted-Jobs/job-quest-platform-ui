"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "@fontsource/press-start-2p";
import TopBar from "@/components/Top-Bar";
import { ethers } from "ethers";
import { abi } from "../content/abi";
import { getCookie } from "cookies-next"; 

export default function PostJob() {
  const router = useRouter(); 
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    jobId: "",
  });
  const [isTransferring, setIsTransferring] = useState(false);
  const [isTransferred, setIsTransferred] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const handleTransferApi = async () => {
    const contractAddress = process.env.CONTRACT_ADDRESS || "0x0E6be64199930b1aa1AF03C89ed7245A97d1f1Ad";
    if (!contractAddress) {
      alert("Contract address is not set. Please check your environment variables.");
      return;
    }

    try {
      setIsTransferring(true);

      const provider = new ethers.BrowserProvider(window.ethereum!);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.depositJob({
        value: ethers.parseEther(form.salary || "0.01"),
      });

      await tx.wait();

      setTransactionHash(tx.hash);
      setIsTransferred(true);
      alert("🎉 Tokens transferred to contract!");
      console.log("Transaction:", tx);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to transfer tokens. Please try again.");
    } finally {
      setIsTransferring(false);
    }
  };

  const handleVerify = async () => {
    if (!transactionHash) {
      alert("No transaction hash found. Please transfer tokens first.");
      return;
    }

    try {
      setIsVerifying(true);

      const provider = new ethers.JsonRpcProvider(process.env.JSON_RPC_PROVIDER || "https://forno.celo.org");
      const txReceipt = await provider.getTransactionReceipt(transactionHash); // 查詢交易回執

      if (!txReceipt || !txReceipt.logs) {
        throw new Error("No logs found in transaction receipt.");
      }

      const contractInterface = new ethers.Interface(abi);

      // 確保合約地址大小寫一致
      const normalizedContractAddress = process.env.CONTRACT_ADDRESS?.toLowerCase() || "0x0E6be64199930b1aa1AF03C89ed7245A97d1f1Ad".toLowerCase();
      const log = txReceipt.logs.find(
        (log) => log.address.toLowerCase() === normalizedContractAddress
      );

      if (!log) {
        console.error("Logs found:", txReceipt.logs);
        throw new Error("No JobDeposited event found in transaction logs.");
      }

      const parsedLog = contractInterface.parseLog(log);
      if (!parsedLog) {
        throw new Error("Failed to parse log. Parsed log is null.");
      }

      // 提取事件數據
      const jobId = parsedLog.args.jobId.toString();
      const recruiter = parsedLog.args.recruiter;
      const reward = parsedLog.args.reward.toString();
      const deposit = parsedLog.args.deposit.toString();

      console.log("Parsed Log:", { jobId, recruiter, reward, deposit });

      setForm((prevForm) => ({ ...prevForm, jobId }));

      setIsVerified(true);
      alert(`✅ Transfer verified on-chain. Job ID: ${jobId}`);
      return jobId; 
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert(`❌ Failed to verify transfer: ${errorMessage}`);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleApiSubmit = async (data = form) => {
    try {
      const name = getCookie("name"); // 從 cookies 中取得 name

      if (!name) {
        throw new Error("User name not found in cookies");
      }

      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to post job");
      }

      // Call updateUser API to update myPosts
      const updateUserResponse = await fetch("/api/updateUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name, 
          myPosts: [data.jobId],
        }),
      });

      if (!updateUserResponse.ok) {
        throw new Error("Failed to update user data");
      }

      alert("🎯 Job successfully posted!");
      router.push("/job-listing");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to post job. Please try again.");
    }
  };

  const isFormComplete =
    form.title &&
    form.company &&
    form.location &&
    form.salary &&
    form.description;

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isFormComplete) return;
      if (!isVerified) {
        const jobId = await handleVerify();
        if (jobId) {
          setForm((prevForm) => ({ ...prevForm, jobId }));
          await handleApiSubmit({ ...form, jobId });
        }
      } else {
        await handleApiSubmit(form);
      }
    };

  return (
    <div className="min-h-screen bg-yellow-50 font-['Press Start 2P'] text-gray-800">
      <TopBar /> {/* 直接在最外層 */}

      <div className="flex flex-col items-center justify-start p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white border-4 border-blue-900 p-6 rounded-none shadow-[6px_6px_0px_black] w-full max-w-2xl space-y-4 text-[10px]"
        >
          <h1 className="text-xl text-blue-900 text-center mb-4 border-b-4 border-blue-900 pb-2">
            🎯 POST A JOB
          </h1>

          {["title", "company", "location", "salary"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={(form as any)[field]}
              onChange={handleChange}
              className="w-full border-4 border-blue-900 p-3 rounded-none bg-gray-100 shadow-[2px_2px_0px_black]"
            />
          ))}

          <textarea
            name="description"
            placeholder="Job description..."
            value={form.description}
            onChange={handleChange}
            className="w-full border-4 border-blue-900 p-3 rounded-none bg-gray-100 h-28 shadow-[2px_2px_0px_black]"
          />

          {/* Token transfer & verify buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* Removed Connect Wallet button */}
            <button
              type="button"
              onClick={handleTransferApi}
              disabled={ isTransferring || isTransferred}
              className="bg-blue-900 text-white py-3 px-4 border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:bg-blue-800 disabled:opacity-50"
            >
              {isTransferring
                ? "Transferring..."
                : isTransferred
                ? "✅ Transferred"
                : "🔁 Transfer Tokens"}
            </button>

            <button
              type="button"
              onClick={handleVerify}
              disabled={!isTransferred || isVerifying || isVerified}
              className="bg-blue-900 text-white py-3 px-4 border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:bg-blue-800 disabled:opacity-50"
            >
              {isVerifying
                ? "Verifying..."
                : isVerified
                ? "✅ Verified"
                : "🔍 Verify Transfer"}
            </button>
          </div>

          <button
            type="submit"
            disabled={!isFormComplete}
            className="w-full bg-blue-900 text-white py-3 mt-4 border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:bg-blue-800 disabled:opacity-50"
          >
            🚀 POST JOB
          </button>
        </form>
      </div>
    </div>
  );
}
