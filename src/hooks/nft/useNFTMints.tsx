import useZDK from "./useZDK";
import useSWR from "swr";

export type useNFTMintsProps = {
  minterAddresses?: string[];
  after?: string;
  limit?: number;
};

const useNFTMints = (props: useNFTMintsProps) => {
  const zdk = useZDK();

  return useSWR(
    ["zdk-mints", props.minterAddresses, props.after, props.limit],
    (_, minterAddresses, after, limit) => {
      if (!zdk || !minterAddresses) return;
      return zdk
        .mints({
          where: { minterAddresses: minterAddresses },
          pagination: { after, limit },
        })
        .then((x) => ({ mints: x.mints.nodes, page: x.mints.pageInfo }));
    }
  );
};

export default useNFTMints;
