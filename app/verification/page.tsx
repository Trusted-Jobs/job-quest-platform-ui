"use client";

import dynamic from "next/dynamic";

// 延遲載入整個使用了 document 的元件，避開 build 階段錯誤
const VerificationForm = dynamic(() => import("@/components/VerificationForm"), {
  ssr: false,
});

export default function Page() {
  return <VerificationForm />;
}
