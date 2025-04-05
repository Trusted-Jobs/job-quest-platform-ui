"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "@fontsource/press-start-2p";

export default function TopBar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    const isVerifiedLength = parseInt(document.cookie.replace(/(?:(?:^|.*;\s*)isVerifiedLength\s*\=\s*([^;]*).*$)|^.*$/, "$1")) || 0;
    setIsVerified(isVerifiedLength > 0);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        alert("Logged out");
        router.push("/login");
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout");
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask is not installed!");
        return;
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
      alert(`🔗 Connected to wallet: ${accounts[0]}`);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to connect wallet. Please try again.");
    }
  };

  const navLinks = [
    { label: "📂 Job Listings", href: "/job-listing", show: true },
    { label: "🎮 My Work", href: "/my-work", show: true },
    { label: "📝 Post Job", href: "/post-job", show: isVerified },
    { label: "🛠 Work Management", href: "/work-management", show: isVerified },
  ];

  return (
    <div className="w-full bg-yellow-50 border-b-4 border-blue-900 py-2 px-4 shadow-[4px_4px_0px_black]">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* 左側連結區 */}
        <div className="hidden md:flex flex-wrap gap-2 text-[9px] font-['Press Start 2P']">
          {navLinks.map(
            (link) =>
              link.show && (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-blue-900 text-white px-3 py-2 border-4 border-black rounded-none shadow-[2px_2px_0px_black] hover:bg-blue-800"
                >
                  {link.label}
                </Link>
              )
          )}

          {/* 驗證按鈕或已驗證標示 */}
          {!isVerified ? (
            <Link
              href="/verification"
              className="bg-yellow-500 text-black px-3 py-2 border-4 border-black rounded-none shadow-[2px_2px_0px_black] hover:bg-yellow-400"
            >
              🛡️ Verify Now
            </Link>
          ) : (
            <span className="bg-green-600 text-white px-3 py-2 border-4 border-black rounded-none shadow-[2px_2px_0px_black]">
              🟢 Verified
            </span>
          )}
        </div>

        {/* 漢堡選單 - RWD */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-blue-900 text-white px-3 py-2 border-4 border-black rounded-none shadow-[2px_2px_0px_black]"
          >
            ☰ Menu
          </button>
        </div>

        {/* 登出與連接錢包按鈕 */}
        <div className="flex items-center gap-2">
          <button
            onClick={connectWallet}
            disabled={!!walletAddress}
            className="bg-blue-900 text-white px-3 py-2 border-4 border-black rounded-none shadow-[2px_2px_0px_black] hover:bg-blue-800 disabled:opacity-50 text-[9px]"
          >
            🔗 Connect Wallet
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-700 text-white px-3 py-2 border-4 border-black rounded-none shadow-[2px_2px_0px_black] hover:bg-red-600 text-[9px]"
          >
            🔓 Logout
          </button>
        </div>
      </div>

      {/* 手機選單項目展開 */}
      {menuOpen && (
        <div className="flex flex-col gap-2 mt-2 md:hidden text-[9px] font-['Press Start 2P']">
          {navLinks.map(
            (link) =>
              link.show && (
                <Link
                  key={link.href}
                  href={link.href}
                  className="bg-blue-900 text-white px-3 py-2 border-4 border-black rounded-none shadow-[2px_2px_0px_black] hover:bg-blue-800"
                >
                  {link.label}
                </Link>
              )
          )}
          {!isVerified ? (
            <Link
              href="/verification"
              className="bg-yellow-500 text-black px-3 py-2 border-4 border-black rounded-none shadow-[2px_2px_0px_black] hover:bg-yellow-400"
            >
              🛡️ Verify Now
            </Link>
          ) : (
            <span className="bg-green-600 text-white px-3 py-2 border-4 border-black rounded-none shadow-[2px_2px_0px_black]">
              🟢 Verified
            </span>
          )}
        </div>
      )}
    </div>
  );
}