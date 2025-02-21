import NFT from "@/db/models/NFT.model";
import { Iid, INFTInput, IWallet } from "@/types";
import { idSchema, NFTSchema, walletSchema } from "../validator";
import { connectToDb } from "@/db/database";

export const storeNFT = async ({ data }: { data: INFTInput }) => {
  try {
    const nft = await NFTSchema.parseAsync({
      nftName: data.nftName,
      nftId: data.nftId,
      nftDescription: data.nftDescription,
      nftLogo: data.nftLogo,
      userWalletAddress: data.userWalletAddress,
    });

    await connectToDb();
    await NFT.create(nft);

    return { success: true, message: "NFT created successfully" };
  } catch (error) {
    console.error("Error storing NFT:", error);
    return { success: false, error: "NFT failed to create" };
  }
};

export const getNFTById = async ({ id }: { id: Iid }) => {
  try {
    const NFTId = await idSchema.parseAsync(id);
    await connectToDb();

    const nft = await NFT.findOne({ nftId: NFTId });
    if (!nft) {
      return { success: false, error: "NFT not found" };
    }

    return { success: true, nft };
  } catch (error) {
    console.error("Error fetching NFT by ID:", error);
    return { success: false, error: "Internal server error" };
  }
};

export const getNFTGallery = async ({ wallet }: { wallet: IWallet }) => {
  try {
    const walletAddress = await walletSchema.parseAsync(wallet);
    await connectToDb();

    const nfts = await NFT.find({ userWalletAddress: walletAddress });

    if (!nfts) {
      return { success: false, error: "No NFTs found for this wallet address" };
    }

    return { success: true, nfts };
  } catch (error) {
    console.error("Error fetching NFT gallery:", error);
    return { success: false, error: "Internal server error" };
  }
};
