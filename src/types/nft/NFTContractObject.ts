import { MARKET_INFO_STATUSES } from "@zoralabs/nft-hooks/dist/types";
import { BigNumberish } from "ethers";

export enum PRIMARY_SALE_SOURCES {
  zoraERC721Drop = "ZoraERC721Drop",
  soundXYZ = "SoundXYZ",
}

export enum PRIMARY_SALE_TYPES {
  PublicEdition = "PublicEdition",
  PresaleEdition = "PresaleEdition",
}

export type EditionContractLike = {
  contractAddress: string;
  source: PRIMARY_SALE_SOURCES;
  status: MARKET_INFO_STATUSES;
  type: PRIMARY_SALE_TYPES;
  maxSupply?: number;
  startTime?: string;
  endTime?: string;
  price: BigNumberish;
  media?: {
    image?: {
      uri: string;
    };
    content?: {
      uri: string;
    };
  };
  raw: any;
};

export declare type PrimarySaleModule = EditionContractLike;

export type NFTContractObject = {
  collection: {
    address: string;
    owner?: string;
    description?: string;
    name?: string;
    symbol?: string;
    totalSupply?: number;
    networkInfo?: {
      chain: string;
      network: string;
    };
  };
  aggregateStat?: {
    floorPrice?: number;
    ownerCount?: number;
    nftCount?: number;
    salesVolume?: {
      chainTokenPrice?: number;
      usdcPrice?: number;
      totalCount?: number;
    };
  };
  markets?: PrimarySaleModule[];
  rawData: {
    [loaderName: string]: any;
  };
};
