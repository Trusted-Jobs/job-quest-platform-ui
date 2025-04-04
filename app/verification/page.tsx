'use client';

import React, { useState } from 'react';
import '@fontsource/press-start-2p';
import TopBar from '@/components/Top-Bar';

export default function VerificationForm() {
  const [form, setForm] = useState({
    name: '',
    nationality: '',
    age: '',
    sanctioned: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isVerified', 'true');
    alert('✅ Verification submitted successfully!');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-yellow-50 font-['Press Start 2P'] text-gray-800">
      <TopBar />
      <div className="flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white border-4 border-blue-900 p-6 rounded-none shadow-[6px_6px_0px_black] w-full max-w-md space-y-4 text-[10px]"
        >
          <h1 className="text-xl text-blue-900 text-center mb-4 border-b-4 border-blue-900 pb-2">
            🛡️ VERIFICATION
          </h1>

          <div>
            <label className="block mb-1">👤 Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border-4 border-blue-900 rounded-none p-2 bg-gray-100 shadow-[2px_2px_0px_black]"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block mb-1">🌍 Nationality</label>
            <input
              name="nationality"
              value={form.nationality}
              onChange={handleChange}
              className="w-full border-4 border-blue-900 rounded-none p-2 bg-gray-100 shadow-[2px_2px_0px_black]"
              placeholder="Taiwan"
            />
          </div>

          <div>
            <label className="block mb-1">🎂 Age</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              className="w-full border-4 border-blue-900 rounded-none p-2 bg-gray-100 shadow-[2px_2px_0px_black]"
              placeholder="30"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="sanctioned"
              checked={form.sanctioned}
              onChange={handleChange}
              className="w-4 h-4 border-2 border-blue-900"
            />
            <label className="text-gray-800">⚠️ Sanctioned?</label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 mt-2 border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:bg-blue-800"
          >
            🚀 SUBMIT VERIFICATION
          </button>
        </form>
      </div>
    </div>
  );
}
