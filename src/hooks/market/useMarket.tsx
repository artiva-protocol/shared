import { NFTObject } from "@zoralabs/nft-hooks";
import { useContext, useMemo } from "react";
import SharedConfigContext from "../../context/SharedConfigContext";
import { IMarketAdapter } from "../../types";

const useMarket = (nft: NFTObject | undefined) => {
  const { marketAdapters } = useContext(SharedConfigContext);
  return useMemo(() => {
    if (!nft) return;
    return marketAdapters?.find((Market) => {
      if (Market.enabled(nft)) return Market;
      else return;
    });
  }, [nft, marketAdapters]) as IMarketAdapter | undefined;
};

export default useMarket;
