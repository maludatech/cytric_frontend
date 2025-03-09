import { connectToDb } from "@/db/database";
import NFT from "@/db/models/NFT.model";
import { idSchema } from "@/lib/validator";

export const GET = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;

    const numericId = Number(id);

    if (!id) {
      throw new Error(`No id provided`);
    }

    if (isNaN(numericId)) {
      throw new Error("Invalid Id format");
    }

    const NFTId = await idSchema.parseAsync(numericId);

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
