'use client';

import React, { useState } from 'react';
import '@fontsource/press-start-2p';
import TopBar from '@/components/Top-Bar';

export default function PostJob() {
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: ''
  });
  const [isTransferring, setIsTransferring] = useState(false);
  const [isTransferred, setIsTransferred] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const handleTransfer = () => {
    setIsTransferring(true);
    setTimeout(() => {
      setIsTransferring(false);
      setIsTransferred(true);
      alert('🎉 Tokens transferred to contract!');
    }, 1500);
  };

  const handleVerify = () => {
    if (!isTransferred) {
      alert('You must transfer first!');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
      alert('✅ Transfer verified on-chain.');
    }, 1500);
  };

  const isFormComplete =
    form.title && form.company && form.location && form.salary && form.description && isVerified;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormComplete) {
      alert('Please complete all fields and verify transfer.');
      return;
    }
    alert('🎯 Job successfully posted!');
  };

  return (
    <div className="min-h-screen bg-yellow-50 font-['Press Start 2P'] text-gray-800">
      <TopBar />
      <div className="flex flex-col items-center justify-start p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white border-4 border-blue-900 p-6 rounded-none shadow-[6px_6px_0px_black] w-full max-w-2xl space-y-4 text-[10px]"
        >
          <h1 className="text-xl text-blue-900 text-center mb-4 border-b-4 border-blue-900 pb-2">
            🎯 POST A JOB
          </h1>

          {['title', 'company', 'location', 'salary'].map((field) => (
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
            <button
              type="button"
              onClick={handleTransfer}
              disabled={isTransferring || isTransferred}
              className="bg-blue-900 text-white py-3 px-4 border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:bg-blue-800 disabled:opacity-50"
            >
              {isTransferring
                ? 'Transferring...'
                : isTransferred
                ? '✅ Transferred'
                : '🔁 Transfer Tokens'}
            </button>

            <button
              type="button"
              onClick={handleVerify}
              disabled={!isTransferred || isVerifying || isVerified}
              className="bg-blue-900 text-white py-3 px-4 border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:bg-blue-800 disabled:opacity-50"
            >
              {isVerifying ? 'Verifying...' : isVerified ? '✅ Verified' : '🔍 Verify Transfer'}
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
