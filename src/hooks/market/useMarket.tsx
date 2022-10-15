import { NFTObject } from "@zoralabs/nft-hooks";
import { useContext, useEffect, useState } from "react";
import SharedConfigContext from "../../context/SharedConfigContext";
import { IMarketAdapter } from "../../types";

const useMarket = (nft: NFTObject | undefined) => {
  const { marketAdapters } = useContext(SharedConfigContext);
  const [market, setMarket] = useState<IMarketAdapter | undefined>();
  useEffect(() => {
    const handler = async () => {
      if (!nft || !marketAdapters) return;
      setMarket(
        (await marketAdapters).find((Market) => {
          if (Market.enabled(nft)) return Market;
          else return;
        })
      );
    };
    handler();
  }, [nft, marketAdapters]);
  return market;
};

export default useMarket;
