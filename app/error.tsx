"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 items-center min-h-screen bg-black relative">
      <div className="flex flex-col gap-4 h-3/5 items-center justify-center relative z-10 pt-10">
        <h1 className="text-[#8B5CF6] text-6xl font-bold">Error</h1>
        <h2 className="text-white text-[16px] font-semibold">
          {error.message}
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row w-full">
          <button
            className="text-white bg-[#8B5CF6] p-3 rounded-xl font-semibold hover:opacity-90 w-full"
            onClick={() => reset()}
          >
            Try again
          </button>
          <button
            className="text-white bg-[#8B5CF6] p-3 rounded-xl font-semibold hover:opacity-90 w-full"
            onClick={() => (window.location.href = "/")}
          >
            Back to home
          </button>
        </div>
      </div>
      <div className="bg-[#8B5CF6] w-full overflow-hidden h-2/5 mt-8 absolute bottom-0 z-0">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-full"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-[#000]"
          ></path>
        </svg>
      </div>
    </div>
  );
}
