import useZDK from "./useZDK";
import useSWR from "swr";
import {
  SortDirection,
  TokenSortKey,
} from "@zoralabs/zdk/dist/queries/queries-sdk";

export type useNFTTokensProps = {
  collectionAddresses?: string[];
  ownerAddresses?: string[];
  after?: string;
  limit?: number;
};

const useNFTTokens = (props: useNFTTokensProps) => {
  const zdk = useZDK();

  const swrProps =
    props.collectionAddresses || props.ownerAddresses
      ? ["zdk-tokens", JSON.stringify(props)]
      : null;

  const fetcher = (_: any) =>
    zdk
      .tokens({
        where: {
          collectionAddresses: props.collectionAddresses,
          ownerAddresses: props.ownerAddresses,
        },
        pagination: {
          limit: props.limit,
          after: props.after,
        },
        sort: {
          sortKey: TokenSortKey.Minted,
          sortDirection: SortDirection.Desc,
        },
        includeFullDetails: false,
        includeSalesHistory: false,
      })
      .then((x) => ({ tokens: x.tokens.nodes, page: x.tokens.pageInfo }));

  return useSWR(swrProps, fetcher);
};

export default useNFTTokens;
