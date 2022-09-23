import { ChainIdentifier } from "../../types/nft/ChainIdentifier";
import { Strategies } from "@zoralabs/nft-hooks";
import { useMemo, useContext } from "react";
import SharedConfigContext from "../../context/SharedConfigContext";

const useStrategy = (chain?: ChainIdentifier) => {
  const { getNFTStrategy } = useContext(SharedConfigContext);
  return useMemo(() => {
    if (!chain) return;
    return getNFTStrategy?.(chain);
  }, [chain]) as Strategies.NFTStrategy | undefined;
};

export default useStrategy;
