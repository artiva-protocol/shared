import { useMemo } from "react";
import { ZDK } from "@zoralabs/zdk";

const useZDK = () => {
  return useMemo(() => {
    return new ZDK({ apiKey: process.env.NEXT_PUBLIC_ZORA_API_KEY });
  }, []);
};

export default useZDK;
