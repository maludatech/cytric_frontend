import { Schema, model, models } from "mongoose";

const NFTSchema = new Schema({
  nftId: {
    type: String,
    required: [true, "NFT Id is required"],
    unique: [true, "NFT Id must be unique"],
  },
  nftName: {
    type: String,
    required: [true, "Please provide a name for the NFT"],
  },
  nftDescription: {
    type: String,
    required: [true, "Please provide a description for the NFT"],
  },
  nftLogo: {
    type: String,
    required: [true, "NFT logo is required"],
  },
  userWalletAddress: {
    type: String,
    required: [true, "User wallet address is required"],
  },
});

const NFT = models.NFT || model("NFT", NFTSchema);

export default NFT;
