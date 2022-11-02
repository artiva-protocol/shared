import { ChainIdentifier } from "../../types/nft/ChainIdentifier";
import { useContext, useState, useEffect } from "react";
import SharedConfigContext from "../../context/SharedConfigContext";
import { NFTContractStrategy } from "../../types/nft/NFTContractStrategy";

const useContractStrategy = (chain?: ChainIdentifier) => {
  const { getNFTContractStrategy } = useContext(SharedConfigContext);
  const [strategy, setStrategy] = useState<NFTContractStrategy | undefined>();
  useEffect(() => {
    const handler = async () => {
      if (!chain || !getNFTContractStrategy) return;
      setStrategy(await getNFTContractStrategy(chain));
    };
    handler();
  }, [chain]);
  return strategy;
};

export default useContractStrategy;
