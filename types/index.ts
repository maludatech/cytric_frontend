import { z } from "zod";
import { idSchema, NFTSchema, walletSchema } from "@/lib/validator";

export type INFTInput = z.infer<typeof NFTSchema>;

export type Iid = z.infer<typeof idSchema>;

export type IWallet = z.infer<typeof walletSchema>;
