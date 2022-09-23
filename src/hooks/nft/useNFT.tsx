import { NFTIdentifier } from "../../types/nft/NFTIdentifier";
import useSWR, { SWRConfiguration } from "swr";
import useStrategy from "./useStrategy";
import merge from "deepmerge";
import { NFTStrategy } from "@zoralabs/nft-hooks/dist/strategies";

const useNFT = (
  identifier?: NFTIdentifier,
  options: SWRConfiguration = {},
  marketOptions: SWRConfiguration = {}
) => {
  const contractAddress = identifier?.contractAddress;
  const tokenId = identifier?.tokenId;

  // Fetch strategy
  const strategy = useStrategy(identifier?.chain);

  // Fetch media data
  const { data: nftData, error: nftError } = useSWR(
    strategy && contractAddress && tokenId
      ? ["fetchNFTData", strategy, contractAddress, tokenId]
      : null,
    (_, strategy: NFTStrategy, address: string, tokenId: string) =>
      strategy.fetchNFT(address, tokenId),
    options
  );

  // Fetch market data (if needed)
  const { data: nftMarketData, error: nftMarketError } = useSWR(
    strategy &&
      contractAddress &&
      tokenId &&
      strategy.hasSecondaryData({ contract: contractAddress, id: tokenId })
      ? ["fetchSecondaryData", strategy, contractAddress, tokenId]
      : null,
    (_, strategy: NFTStrategy, address: string, tokenId: string) =>
      strategy.fetchSecondaryData(address, tokenId, nftData),
    marketOptions
  );

  return {
    data:
      nftData || nftMarketData
        ? merge(nftData || {}, nftMarketData || {})
        : undefined,
    currencyLoaded: false,
    error: nftError,
    marketError: nftMarketError,
  };
};

export default useNFT;
