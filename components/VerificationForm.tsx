"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import SelfQRcodeWrapper, { SelfApp, SelfAppBuilder } from "@selfxyz/qrcode";
import ClientQRWrapper from "@/components/ClientQRWrapper";

export default function VerificationForm() {
    const [form, setForm] = useState({
        name: "",
        disclosures: {
            nationality: false,
            ofac: false,
            name: true,
        },
    });
    const [selfApp, setSelfApp] = useState<SelfApp | null>(null);
    const router = useRouter();

    useEffect(() => {
        const name = getCookie("name") as string;
        if (name) {
            setForm((prevForm) => ({ ...prevForm, name }));
        }

        const selfApp = new SelfAppBuilder({
            appName: "Verification Platform",
            scope: "default",
            endpoint: "https://trusted-jobs-ui.vercel.app/api/verify",
            logoBase64: "https://i.imgur.com/Rz8B3s7.png",
            userId: uuidv4(),
            disclosures: form.disclosures,
            devMode: true,
        } as Partial<SelfApp>).build();

        setSelfApp(selfApp);
    }, [form.disclosures]);

    const handleDisclosureChange = (field: string) => {
        setForm((prevForm) => ({
            ...prevForm,
            disclosures: {
                ...prevForm.disclosures,
                [field]: field === "minimumAge" 
                    ? { minimumAge: 18 }
                    : !prevForm.disclosures[field as keyof typeof prevForm.disclosures],
            },
        }));
    };

    const updateUserData = async (data: typeof form) => {
        try {
            const isVerified = Object.keys(data.disclosures).filter(
                (key) => data.disclosures[key as keyof typeof data.disclosures]
            );

            const response = await fetch("/api/updateUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, isVerified }),
            });

            if (!response.ok) throw new Error("Failed to update user data");

            setCookie("disclosures", JSON.stringify(data.disclosures));
            setCookie("isVerifiedLength", String(isVerified.length));

            alert("✅ Verification submitted successfully!");
            router.push("/job-listing");
        } catch (error) {
            console.error(error);
            alert("❌ Failed to submit verification.");
        }
    };

    const handleVerificationSuccess = () => {
        console.log("Verification successful");
        updateUserData(form);
    };

    return (
        <div className="min-h-screen bg-yellow-50 flex items-center justify-center p-6 font-['Press Start 2P'] text-gray-800">
            <form
                onSubmit={(e) => e.preventDefault()}
                className="bg-white border-4 border-blue-900 p-6 rounded-none shadow-[6px_6px_0px_black] w-full max-w-md space-y-4 text-[10px]"
            >
                <h1 className="text-xl text-blue-900 text-center mb-4 border-b-4 border-blue-900 pb-2">
                    🛡️ VERIFICATION
                </h1>

                <div>
                    <label className="block mb-1">👤 Name: {form.name || "No name provided"}</label>
                </div>

                <div>
                    <label className="block mb-1">✅ Select items to verify</label>
                    <div className="space-y-2">
                        {["nationality", "minimumAge", "ofac"].map((key) => (
                            <div key={key}>
                                <input
                                    type="checkbox"
                                    checked={!!form.disclosures[key as keyof typeof form.disclosures]}
                                    onChange={() => handleDisclosureChange(key)}
                                    className="mr-2"
                                />
                                <label>
                                    {key === "nationality" && "🌍 Nationality"}
                                    {key === "minimumAge" && "🎂 Age more than 18"}
                                    {key === "ofac" && "⚠️ OFAC Sanctioned"}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {selfApp ? (
                    <SelfQRcodeWrapper
                    key={JSON.stringify(selfApp)}
                    selfApp={selfApp}
                    type="websocket"
                    onSuccess={handleVerificationSuccess}
                    darkMode={false}
                    />
                    ) : (
                    <p>Loading QR code...</p>
                    )}
                <button
                    type="button"
                    onClick={() => alert("Please complete verification via QR code.")}
                    className="w-full bg-blue-900 text-white py-3 mt-2 border-4 border-black rounded-none shadow-[4px_4px_0px_black] hover:bg-blue-800"
                >
                    🚀 SUBMIT VERIFICATION
                </button>
            </form>
        </div>
    );
}
