import { MARKET_INFO_STATUSES } from "@zoralabs/nft-hooks/dist/types";

export enum PRIMARY_SALE_SOURCES {
  zoraERC721Drop = "ZoraERC721Drop",
}

export type EditionContractLike = {
  source: PRIMARY_SALE_SOURCES;
  status: MARKET_INFO_STATUSES;
  contractURI: string;
  maxSupply: string;
  totalMinted: string;
  owner: string;
  contractInfo?: {
    name: string;
    description: string;
    imageURI: string;
    animationURI: string;
    media?: string;
  };
  salesConfig: {
    publicSalePrice: string;
    presaleStart?: string;
    presaleEnd?: string;
    publicSaleStart?: string;
    publicSaleEnd?: string;
  };
};

export declare type PrimarySaleModule = EditionContractLike;

export type NFTContractObject = {
  rawData: {
    [loaderName: string]: any;
  };
  collection: {
    address: string;
    description?: string;
    name?: string | null | undefined;
    symbol?: string | null | undefined;
    totalSupply?: number | null | undefined;
    networkInfo?: {
      chain: string;
      network: string;
    };
  };
  aggregateStat?: {
    floorPrice?: number | null;
    ownerCount: number;
    nftCount: number;
    salesVolume: {
      chainTokenPrice: number;
      usdcPrice: number;
      totalCount: number;
    };
  };
  markets?: PrimarySaleModule[];
};
