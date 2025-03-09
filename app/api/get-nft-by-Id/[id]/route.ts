import { connectToDb } from "@/db/database";
import NFT from "@/db/models/NFT.model";
import { idSchema } from "@/lib/validator";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: number }> }
) => {
  try {
    const id = await params;
    if (!id) {
      throw new Error(`No id provided`);
    }
    const NFTId = await idSchema.parseAsync(id);

    if (!NFTId) {
      throw new Error("Invalid Id");
    }

    await connectToDb();

    const nft = await NFT.findOne({ nftId: NFTId });

    if (!nft) {
      return new Response(JSON.stringify({ error: "NFT not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(nft), { status: 200 });
  } catch (error) {
    console.error("Error fetching NFT by Id:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 200,
    });
  }
};
