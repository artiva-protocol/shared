import { ChainIdentifier } from "../../types/nft/ChainIdentifier";
import { Strategies } from "@zoralabs/nft-hooks";
import { useContext, useEffect, useState } from "react";
import SharedConfigContext from "../../context/SharedConfigContext";

const useStrategy = (chain?: ChainIdentifier) => {
  const { getNFTStrategy } = useContext(SharedConfigContext);
  const [strategy, setStrategy] = useState<
    Strategies.NFTStrategy | undefined
  >();
  useEffect(() => {
    const handler = async () => {
      if (!chain || !getNFTStrategy) return;
      setStrategy(await getNFTStrategy(chain));
    };
    handler();
  }, [chain]);
  return strategy;
};

export default useStrategy;
