import useZDK from "./useZDK";
import useSWRInfinite from "swr/infinite";
import {
  MintWithTokenAndMarkets,
  PageInfo,
} from "@zoralabs/zdk/dist/queries/queries-sdk";

export type useNFTMintsProps = {
  minterAddresses?: string[];
  after?: string;
  limit?: number;
  onSuccess?: (data: any[]) => void;
};

const useNFTMints = (props: useNFTMintsProps) => {
  const zdk = useZDK();

  const defaultParams = ["zdk-tokens", props.minterAddresses, props.limit];

  const getKey = (
    idx: number,
    prev: { mints: MintWithTokenAndMarkets; page: PageInfo } | undefined
  ) => {
    if (
      (prev && !prev.mints) ||
      !props.minterAddresses ||
      props.minterAddresses.length < 1
    )
      return null;

    if (idx === 0) return [...defaultParams, null];

    return prev?.page.endCursor
      ? [...defaultParams, prev.page.endCursor]
      : [...defaultParams, null];
  };

  const fetcher = (
    _: string,
    minterAddresses: string[],
    limit?: number,
    after?: string
  ) =>
    zdk
      .mints({
        where: { minterAddresses: minterAddresses },
        pagination: { after: after, limit: limit },
      })
      .then((x) => ({ mints: x.mints.nodes, page: x.mints.pageInfo }));

  const swr = useSWRInfinite(getKey, fetcher, { onSuccess: props.onSuccess });

  const { size, data } = swr;

  const loading = size > (data?.length || 0);
  const more = data ? data[data.length - 1]?.page.hasNextPage || 0 : true;

  return { ...swr, loading, more };
};

export default useNFTMints;
