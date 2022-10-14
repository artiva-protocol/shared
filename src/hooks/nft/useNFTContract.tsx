import useSWR, { SWRConfiguration } from "swr";
import merge from "deepmerge";
import useContractStrategy from "./useContractStrategy";
import { NFTContractStrategy } from "../../types/nft/NFTContractStrategy";
import { ChainIdentifier } from "../../types/nft/ChainIdentifier";
import { NFTContractObject } from "../../types/nft/NFTContractObject";

export type NFTContractIdentifier = {
  contractAddress: string | undefined;
  chain: ChainIdentifier;
};

export type UseNFTContractType = {
  data: NFTContractObject | undefined;
  error: Error | undefined;
  marketError: Error | undefined;
};

const useNFTContract = (
  identifier?: NFTContractIdentifier,
  options: SWRConfiguration = {},
  marketOptions: SWRConfiguration = {}
): UseNFTContractType => {
  const contractAddress = identifier?.contractAddress;

  // Fetch strategy
  const strategy = useContractStrategy(identifier?.chain);

  // Fetch media data
  const { data: nftContractData, error: nftError } = useSWR(
    strategy && contractAddress
      ? ["fetchNFTContractData", strategy, contractAddress]
      : null,
    (_, strategy: NFTContractStrategy, address: string) =>
      strategy.fetchNFTContract(address),
    options
  );

  // Fetch market data (if needed)
  const { data: nftContractMarketData, error: nftMarketError } = useSWR(
    strategy &&
      contractAddress &&
      strategy.hasSecondaryData({ address: contractAddress })
      ? ["fetchContractSecondaryData", strategy, contractAddress]
      : null,
    (_, strategy: NFTContractStrategy, address: string) =>
      strategy.fetchSecondaryData(address, nftContractData),
    marketOptions
  );

  return {
    data:
      nftContractData || nftContractMarketData
        ? merge(nftContractData || {}, nftContractMarketData || {})
        : undefined,
    error: nftError,
    marketError: nftMarketError,
  };
};

export default useNFTContract;
