import { ChainIdentifier } from "../../types/nft/ChainIdentifier";
import { useMemo, useContext } from "react";
import SharedConfigContext from "../../context/SharedConfigContext";
import { NFTContractStrategy } from "../../types/nft/NFTContractStrategy";

const useContractStrategy = (chain?: ChainIdentifier) => {
  const { getNFTContractStrategy } = useContext(SharedConfigContext);
  return useMemo(() => {
    if (!chain) return;
    return getNFTContractStrategy?.(chain);
  }, [chain]) as NFTContractStrategy;
};

export default useContractStrategy;
