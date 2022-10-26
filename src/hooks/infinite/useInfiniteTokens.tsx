import useObserver from "../utils/useObserver";
import useNFTTokens, { UseNFTTokensProps } from "../nft/useNFTTokens";
import { useEffect } from "react";

const useInfiniteTokens = (config: UseNFTTokensProps) => {
  const { loaderElementRef, setEnabled, enabled, intersecting } = useObserver();

  const { data, loading, more, setSize } = useNFTTokens({
    ...config,
  });

  useEffect(() => {
    const hasData = data?.length || 0 > 1;
    //Disable the observer when theres no more elements to load
    if (hasData && !more && enabled) {
      setEnabled(false);
    }

    //Enable the observer one second after the inital data load
    else if (!hasData && more && !enabled) {
      setTimeout(() => {
        setEnabled(true);
      }, 1000);
    }
  }, [data]);

  useEffect(() => {
    if (intersecting) setSize((x) => x + 1);
  }, [intersecting]);

  return { data: data, more, loading, loaderElementRef };
};

export default useInfiniteTokens;
