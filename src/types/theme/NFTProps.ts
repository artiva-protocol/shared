import { NFTObject } from "@zoralabs/nft-hooks";
import { PlatformThemeType } from ".";
import { ArtivaContextType } from "../../context/ArtivaContext";

export type NFTProps = {
  ctx: ArtivaContextType;
  platform: PlatformThemeType;
  nft?: NFTObject;
};
