"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { APP_NAME } from "@/lib/constant";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { useAccount } from "wagmi";
import contractABI from "@/contracts/contractABI.json";

// Form Values Interface
interface FormValues {
  nftName: string;
  nftDescription: string;
  imageUrl: string;
}

const MINTING_CONTRACT_ADDRESS = "0x743f49311a82fe72eb474c44e78da2a6e0ae951c";

export const FormSection = () => {
  const { address, isConnected } = useAccount();

  const client = createWalletClient({
    chain: sepolia,
    transport: http(),
  });

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  });

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isNFTMinted, setIsNFTMInted] = useState(true);

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
  }, [errors.nftName, errors.nftDescription, errors.imageUrl, toast]);

  // Helper function to generate a random numeric ID
  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000000); // Random ID between 0 and 999999
  };

  // Function to check if the NFT ID exists on the blockchain
  // const checkIfIdExists = async (id: number) => {
  //   try {
  //     const exists = await publicClient.readContract({
  //       address: MINTING_CONTRACT_ADDRESS,
  //       abi: contractABI,
  //       functionName: "checkId", // Replace with your contract's function to check existence
  //       args: [id],
  //     });
  //     return exists;
  //   } catch (error) {
  //     console.error("Error checking if NFT exists:", error);
  //     return false;
  //   }
  // };

  // Function to find a unique ID for minting
  // const findUniqueId = async () => {
  //   let id = generateRandomId();
  //   let exists = await checkIfIdExists(id);

  //   // Loop to find a unique ID
  //   while (exists) {
  //     id = generateRandomId();
  //     exists = await checkIfIdExists(id);
  //   }

  //   return id;
  // };

  // const onSubmit = async (data: FormValues) => {
  //   if (!address || !isConnected) {
  //     toast({
  //       title: "Error",
  //       description: "Please connect your wallet first",
  //       variant: "destructive",
  //     });
  //     return;
  //   }
  //   try {
  //     setIsLoading(true);
  //     const id = await findUniqueId(); // Find unique ID
  //     const accounts = await window.ethereum.request({
  //       method: "eth_requestAccounts",
  //     });
  //     const userAccount = accounts[0];

  //     const { request } = await publicClient.simulateContract({
  //       address: MINTING_CONTRACT_ADDRESS,
  //       abi: contractABI,
  //       functionName: "mint",
  //       args: [id, data.nftName, data.nftDescription, data.imageUrl],
  //       account: userAccount,
  //     });

  //     const hash = await client.writeContract({
  //       ...request,
  //       account: userAccount,
  //     });

  //     console.log("Transaction Hash:", hash);

  //     // Store NFT data in the backend
  //     await fetch("https://cytric-backend-z54j.onrender.com/nft", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         nftId: id,
  //         nftName: data.nftName,
  //         nftDescription: data.nftDescription,
  //         nftLogo: data.imageUrl,
  //         userWalletAddress: userAccount,
  //       }),
  //     });

  //     toast({
  //       title: "Success",
  //       description: "NFT minted successfully!",
  //       variant: "default",
  //     });
  //   } catch (error) {
  //     console.error("Error minting NFT:", error);
  //     toast({
  //       title: "Error",
  //       description: "Failed to mint NFT. Please try again.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const onSubmit = async (data: FormValues) => {
    if (!address || !isConnected) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }
    try {
      setIsLoading(true);
      const id = await generateRandomId(); // Find unique ID
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userAccount = accounts[0];

      // Store NFT data in the backend
      await fetch("https://cytric-backend-z54j.onrender.com/nft", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nftId: id,
          nftName: data.nftName,
          nftDescription: data.nftDescription,
          nftLogo: data.imageUrl,
          userWalletAddress: userAccount,
        }),
      });

      toast({
        title: "Success",
        description: "NFT minted successfully!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error minting NFT:", error);
      toast({
        title: "Error",
        description: "Failed to mint NFT. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full flex justify-center px-8 sm:px-0 ">
      {isNFTMinted ? (
        <div className="text-white bg-[#11182780] p-8 border-[#10B981] border rounded-lg flex flex-col gap-8 w-full max-w-xl items-center justify-center">
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="bg-[#10B98133] rounded-full p-5">
              <Check color="#10B981" strokeWidth={3} />
            </div>
            <h2 className="text-[#10B981] font-bold text-xl">
              NFT Minted Successfully!
            </h2>
            <p className="text-[16px] text-[#9CA3AF]">
              Your NFT has been created and added to your collection
            </p>
          </div>
          <div className="bg-[#1F293780]"></div>
        </div>
      ) : (
        <form
          className="text-white bg-[#11182780] p-8 border-[#1F2937] border rounded-lg flex flex-col gap-8 w-full max-w-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-xl text-start text-white">
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
          <button
            className="flex gap-2 bg-gradient-to-r from-[#EC4899] to-[#8B5CF6] rounded-xl text-[16px] p-4 text-white items-center justify-center font-bold"
            disabled={isLoading}
          >
            <Image
              src={"/assets/images/Frame(2).png"}
              alt={`${APP_NAME} icon`}
              width={20}
              height={20}
            />
            {isLoading ? "Minting" : "Mint NFT"}
          </button>
        </form>
      )}
    </div>
  );
};
