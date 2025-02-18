import { FormSection } from "@/components/FormSection";
import { HeroSection } from "@/components/HeroSection";
import { Gallery } from "@/components/Gallery";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 sm:gap-20 items-center pb-10">
      <HeroSection />
      <FormSection />
      <Gallery />
    </div>
  );
}
