import { connectToDb } from "@/db/database";
import NFT from "@/db/models/NFT.model";
import { NFTSchema } from "@/lib/validator";

export const POST = async (req: Request, res: Response) => {
  try {
    const { data } = await req.json();

    if (!data) {
      return new Response(JSON.stringify({ error: "Data is required" }), {
        status: 400,
      });
    }

    const nft = await NFTSchema.parseAsync({
      nftName: data.nftName,
      nftId: data.nftId,
      nftDescription: data.nftDescription,
      nftLogo: data.nftLogo,
      userWalletAddress: data.userWalletAddress,
    });

    await connectToDb();

    await NFT.create(nft);

    return new Response(JSON.stringify(nft), { status: 201 });
  } catch (error: any) {
    console.error("Error creating NFT", error.message);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
};
