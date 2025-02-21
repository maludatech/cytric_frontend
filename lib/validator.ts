import { z } from "zod";

export const walletSchema = z.string().nonempty();

export const idSchema = z.string().nonempty();

export const NFTSchema = z.object({
  nftId: z.string().nonempty(),
  nftName: z.string().nonempty(),
  nftDescription: z.string().nonempty(),
  nftLogo: z.string().nonempty(),
  userWalletAddress: z.string().nonempty(),
});
