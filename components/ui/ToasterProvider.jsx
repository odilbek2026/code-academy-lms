"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3200,
        style: {
          background: "var(--surface)",
          color: "var(--foreground)",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          padding: "10px 16px",
          fontSize: "13.5px",
          boxShadow: "0 12px 32px -12px rgba(0,0,0,0.25)",
        },
        success: { iconTheme: { primary: "#22C55E", secondary: "white" } },
        error: { iconTheme: { primary: "#EF4444", secondary: "white" } },
      }}
    />
  );
}
