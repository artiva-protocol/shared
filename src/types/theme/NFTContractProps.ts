import { PlatformThemeType } from ".";
import { ArtivaContextType } from "../../context/ArtivaContext";
import { NFTContractObject } from "../nft";

export type NFTContractProps = {
  ctx: ArtivaContextType;
  platform: PlatformThemeType;
  nftContract?: NFTContractObject;
};
