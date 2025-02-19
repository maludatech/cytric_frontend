"use client";

import { useRef } from "react";
import { FormSection } from "@/components/FormSection";
import { HeroSection } from "@/components/HeroSection";
import { Gallery } from "@/components/Gallery";

export default function Home() {
  const formRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="flex flex-col gap-16 sm:gap-20 items-center pb-10">
      <HeroSection formRef={formRef} />
      <FormSection ref={formRef} />
      <Gallery />
    </div>
  );
}
