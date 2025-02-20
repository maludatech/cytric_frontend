"use client";
import { useState } from "react";

export default function TestError() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error("This is a test error!");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-white text-3xl">Click below to trigger an error</h1>
      <button
        onClick={() => setHasError(true)}
        className="text-white bg-[#8B5CF6] p-4 rounded-xl font-semibold hover:opacity-90 mt-4"
      >
        Trigger Error
      </button>
    </div>
  );
}
