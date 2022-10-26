import useZDK from "./useZDK";
import useSWRInfinite from "swr/infinite";
import {
  SortDirection,
  TokenSortKey,
  PageInfo,
  TokenWithMarketsSummary,
} from "@zoralabs/zdk/dist/queries/queries-sdk";

export type UseNFTTokensProps = {
  collectionAddresses?: string[];
  ownerAddresses?: string[];
  limit?: number;
  after?: any;
  onSuccess?: (data: any[]) => void;
};

const useNFTTokens = (props: UseNFTTokensProps) => {
  const zdk = useZDK();

  const defaultParams = [
    "zdk-tokens",
    props.collectionAddresses,
    props.ownerAddresses,
    props.limit,
  ];

  const getKey = (
    idx: number,
    prev: { tokens: TokenWithMarketsSummary; page: PageInfo } | undefined
  ) => {
    if (
      (prev && !prev.tokens) ||
      (!props.collectionAddresses && !props.ownerAddresses)
    )
      return null;

    if (idx === 0) return [...defaultParams, null];

    return prev?.page.endCursor
      ? [...defaultParams, prev.page.endCursor]
      : [...defaultParams, null];
  };

  const fetcher = (
    _: string,
    collectionAddresses: string[],
    ownerAddresses: string[],
    limit?: number,
    after?: string
  ) =>
    zdk
      .tokens({
        where: {
          collectionAddresses: collectionAddresses,
          ownerAddresses: ownerAddresses,
        },
        pagination: {
          limit: limit,
          after: after,
        },
        sort: {
          sortKey: TokenSortKey.Minted,
          sortDirection: SortDirection.Desc,
        },
        includeFullDetails: false,
        includeSalesHistory: false,
      })
      .then((x) => ({ tokens: x.tokens.nodes, page: x.tokens.pageInfo }));

  const swr = useSWRInfinite(getKey, fetcher, { onSuccess: props.onSuccess });
  const { size, data } = swr;

  const loading = size > (data?.length || 0);
  const more = data ? data[data.length - 1]?.page.hasNextPage || false : true;

  return { ...swr, loading, more };
};

export default useNFTTokens;
