import { connectToDb } from "@/db/database";
import NFT from "@/db/models/NFT.model";
import { walletSchema } from "@/lib/validator";
import { IWallet } from "@/types";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ wallet: IWallet }> }
) => {
  try {
    const { wallet } = await params;

    const walletAddress = String(wallet);
    const userWalletAddress = await walletSchema.parseAsync(walletAddress);

    if (!userWalletAddress) {
      throw new Error(`Invalid wallet address: ${wallet}`);
    }

    await connectToDb();

    const nfts = await NFT.find({ userWalletAddress });

    if (!nfts) {
      return { success: false, error: "No NFTs found for this wallet address" };
    }

    return new Response(JSON.stringify(nfts), { status: 200 });
  } catch (error) {
    console.error("Error fetching NFT gallery:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 200,
    });
  }
};
