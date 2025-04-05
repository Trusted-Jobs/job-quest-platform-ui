"use client";

import { SelfApp } from "@selfxyz/qrcode";
import dynamic from "next/dynamic";

// 注意：這邊延遲載入的是 default export
const SelfQRcodeWrapper = dynamic(() =>
    import("@selfxyz/qrcode").then(mod => mod.default),
    { ssr: false }
);

export default function ClientQRWrapper({
    selfApp,
    onSuccess,
}: {
    selfApp: SelfApp;
    onSuccess: () => void;
}) {
    return (
        <SelfQRcodeWrapper
            selfApp={selfApp}
            type="websocket"
            onSuccess={onSuccess}
            darkMode={false}
        />
    );
}
