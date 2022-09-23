import {
  MARKET_INFO_STATUSES,
  MARKET_TYPES,
  AuctionLike,
  NFTObject,
} from "@zoralabs/nft-hooks/dist/types";
import { useMemo } from "react";

const useFindAuction = (nft: NFTObject | undefined) => {
  return useMemo(
    () =>
      nft?.markets?.find(
        (x) =>
          x.type === MARKET_TYPES.AUCTION &&
          x.status === MARKET_INFO_STATUSES.ACTIVE
      ),
    [nft?.markets]
  ) as AuctionLike | undefined;
};

export default useFindAuction;
