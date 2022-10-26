import useObserver from "../utils/useObserver";
import { useEffect } from "react";
import useNFTMints, { useNFTMintsProps } from "../nft/useNFTMints";

const useInfiniteMints = (config: useNFTMintsProps) => {
  const { loaderElementRef, setEnabled, enabled, intersecting } = useObserver();

  const { data, loading, more, setSize } = useNFTMints({
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

export default useInfiniteMints;
