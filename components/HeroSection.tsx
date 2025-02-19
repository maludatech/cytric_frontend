import { CirclePlay, Rocket } from "lucide-react";

export const HeroSection = ({
  formRef,
}: {
  formRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col items-center justify-center pt-16 gap-8 text-center">
      <h1 className="flex text-white text-4xl lg:text-5xl font-bold max-w-lg">
        Discover & Collect Extraordinary NFTs
      </h1>
      <p className="text-[#D1D5DB] max-w-xl text-lg">
        Enter the world of digital art and collectibles. Explore unique NFTs
        created by artists worldwide.
      </p>
      <div className="flex gap-2">
        <button
          className="flex gap-1 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] rounded-xl text-sm p-4 text-white items-center font-bold hover:opacity-90"
          onClick={scrollToForm}
        >
          <Rocket color="#ffffff" strokeWidth={1.75} size={20} />
          Start Creating
        </button>
        <button className="flex gap-1 bg-[#1F293780] border border-[#374151] rounded-xl text-sm p-4 text-white items-center hover:opacity-90">
          <CirclePlay color="#ffffff" strokeWidth={1.75} size={20} />
          Watch Demo
        </button>
      </div>
    </div>
  );
};
