import { NFTObject } from "@zoralabs/nft-hooks";
import { ArtivaContextType } from "../../context/ArtivaContext";
import { Platform } from "../metadata";

export type NFTProps = {
  ctx: ArtivaContextType;
  platform: Platform;
  nft?: NFTObject;
};
