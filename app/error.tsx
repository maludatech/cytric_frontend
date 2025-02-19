"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00000000]">
      <h1 className="text-[#8B5CF6]">404</h1>
      <h2>Wrong Destination</h2>
      <button>Take me home</button>
    </div>
  );
}
