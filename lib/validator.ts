import { z } from "zod";

export const walletSchema = z.string().nonempty();

export const idSchema = z.number().int().positive();

export const NFTSchema = z.object({
  nftId: z.number().int().positive(),
  nftName: z.string().nonempty(),
  nftDescription: z.string().nonempty(),
  nftLogo: z.string().nonempty(),
  userWalletAddress: z.string().nonempty(),
});
