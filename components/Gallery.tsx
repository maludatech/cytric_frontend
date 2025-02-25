"use client";

import { getNFTGallery } from "@/lib/actions/NFT.actions";
import Image from "next/image";
import { useState, useEffect } from "react";
import { INFTInput } from "@/types";

export const Gallery = () => {
  const [data, setData] = useState<INFTInput[] | null>(null);

  const sampleData = [
    {
      _id: 1,
      nftName: "Cosmic Dreams #001",
      nftDescription: "A journey through digital dimensions",
      imageUrl: "/assets/images/nfts/image1.png",
    },
    {
      _id: 2,
      nftName: "Neo Genesis #002",
      nftDescription: "Digital evolution manifested",
      imageUrl: "/assets/images/nfts/image2.png",
    },
    {
      _id: 3,
      nftName: "Digital Horizon #003",
      nftDescription: "Where reality meets digital art",
      imageUrl: "/assets/images/nfts/image3.png",
    },
  ];

  const fetchData = async () => {
    try {
      if (!window.ethereum) {
        console.error("Metamask not installed");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const userWallet = accounts[0];
      const res = await getNFTGallery(userWallet);

      if (res.success) {
        setData(res.nfts ?? []);
      }
    } catch (error) {
      console.error("Error fetching NFT gallery:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-8 px-4">
      <h2 className="text-white font-bold text-xl">Top NFT in the market</h2>
      <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {sampleData.map((data) => (
          <div
            key={data._id}
            className="flex flex-col bg-[#11182780] rounded-b-lg"
          >
            <Image
              src={data.imageUrl}
              alt={data.nftName}
              width={400}
              height={400}
              className="rounded-t-lg"
            />
            <div className="flex flex-col gap-2 p-3">
              <h3 className="font-bold text-[16px] text-[#FFFFFF]">
                {data.nftName}
              </h3>
              <p className="text-sm text-[#9CA3AF]">{data.nftDescription}</p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-white font-bold text-xl">Your NFT Gallery</h2>
      <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {!data || data.length === 0 ? (
          <p className="text-white">No NFTs found for this wallet address</p>
        ) : (
          data.map((data) => (
            <div
              key={data.nftId}
              className="flex flex-col bg-[#11182780] rounded-b-lg"
            >
              <Image
                src={data.nftLogo}
                alt={data.nftName}
                width={400}
                height={400}
                className="rounded-t-lg"
              />
              <div className="flex flex-col gap-2 p-3">
                <h3 className="font-bold text-[16px] text-[#FFFFFF]">
                  {data.nftName}
                </h3>
                <p className="text-sm text-[#9CA3AF]">{data.nftDescription}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
