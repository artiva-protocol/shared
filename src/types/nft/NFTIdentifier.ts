import { ChainIdentifier } from "./ChainIdentifier";

export type NFTIdentifier = {
  chain: ChainIdentifier;
  contractAddress: string;
  tokenId: string;
};
