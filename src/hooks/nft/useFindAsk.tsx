import {
  MARKET_INFO_STATUSES,
  MARKET_TYPES,
  FixedPriceLike,
  NFTObject,
} from "@zoralabs/nft-hooks/dist/types";
import { useMemo } from "react";

const useFindAsk = (nft: NFTObject | undefined) => {
  return useMemo(
    () =>
      nft?.markets?.find(
        (x) =>
          x.type === MARKET_TYPES.FIXED_PRICE &&
          x.status === MARKET_INFO_STATUSES.ACTIVE
      ),
    [nft?.markets]
  ) as FixedPriceLike | undefined;
};

export default useFindAsk;
