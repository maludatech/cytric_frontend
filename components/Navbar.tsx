import { Wallet } from "lucide-react";
import Image from "next/image";
import { APP_NAME } from "@/libs/constant";

export const Navbar = () => {
  return (
    <nav className="bg-[#1F2937] px-8">
      <div className="flex justify-between items-center body-container  h-16">
        <Image
          src={"/assets/images/Frame.png"}
          alt={`${APP_NAME} icon`}
          width={30}
          height={30}
        />

        <button className="flex gap-2 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] rounded-full text-sm p-2 text-white items-center">
          <Wallet color="#ffffff" strokeWidth={1.25} size={20} />
          Connect Wallet
        </button>
      </div>
    </nav>
  );
};
