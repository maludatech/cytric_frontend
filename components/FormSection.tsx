"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { APP_NAME } from "@/lib/constant";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Form Values Interface
interface FormValues {
  nftName: string;
  nftDescription: string;
  imageUrl: string;
}

export const FormSection = () => {
  const { toast } = useToast();

  // Validation Schema using Yup
  const schema = yup.object().shape({
    nftName: yup.string().required("NFT name is required"),
    nftDescription: yup.string().required("NFT description is required"),
    imageUrl: yup.string().required("NFT image url is required"),
  });

  // Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  // Update errorMessage whenever there is a validation error
  useEffect(() => {
    if (errors.nftName) {
      toast({
        title: "Error",
        description: errors.nftName.message,
        variant: "destructive",
      });
    } else if (errors.nftDescription) {
      toast({
        title: "Error",
        description: errors.nftDescription.message,
        variant: "destructive",
      });
    } else if (errors.imageUrl) {
      toast({
        title: "Error",
        description: errors.imageUrl.message,
        variant: "destructive",
      });
    }
  }, [errors.nftName, errors.nftDescription, errors.imageUrl]);

  const onSubmit = (data: FormValues) => {};

  return (
    <div className="w-full flex justify-center px-8 sm:px-0 ">
      <form
        className="text-white bg-[#11182780] p-8 border-[#1F2937] border rounded-lg flex flex-col gap-8 w-full max-w-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-xl text-start text-=[#FFFFFF]">
          Mint Your NFT
        </h1>
        <div className="text-[#9CA3AF] flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-normal">NFT Name</label>
            <input
              className="w-full text-[16px] bg-[#1F2937] border-[#374151] rounded-lg p-4"
              placeholder="Enter NFT name"
              {...register("nftName")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-normal">NFT Description</label>
            <textarea
              className="w-full text-[16px] bg-[#1F2937] border-[#374151] rounded-lg p-4"
              placeholder="Describe your NFT"
              rows={4}
              {...register("nftDescription")}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-normal">Image URL</label>
            <input
              className="w-full text-[16px] bg-[#1F2937] border-[#374151] rounded-lg p-4"
              placeholder="Enter image URL"
              {...register("imageUrl")}
            />
          </div>
        </div>
        <button className="flex gap-2 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] rounded-xl text-[16px] p-4 text-white items-center justify-center font-bold">
          <Image
            src={"/assets/images/Frame(2).png"}
            alt={`${APP_NAME} icon`}
            width={20}
            height={20}
          />
          Mint NFT
        </button>
      </form>
    </div>
  );
};
