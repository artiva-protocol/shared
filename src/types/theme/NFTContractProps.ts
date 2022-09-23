import { ArtivaContextType } from "../../context/ArtivaContext";
import { Platform } from "../metadata";
import { NFTContractObject } from "../nft/NFTContractObject";

export type NFTContractProps = {
  ctx: ArtivaContextType;
  platform: Platform;
  nftContract?: NFTContractObject;
};
